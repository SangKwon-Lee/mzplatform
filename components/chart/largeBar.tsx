import { css } from '@emotion/react';
import theme from '../../commons/theme';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, LineElement, Legend, LineController, BarController, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { priceToString } from '../../commons/utils';
import _ from 'lodash';

ChartJS.register(LinearScale, CategoryScale, BarElement, LineElement, LineController, BarController, Legend, PointElement, ChartDataLabels);

interface Props {
  labels: string[];
  dataset: number[];
}

const MAX_BAR_HEIGHT = 140;
const MIN_BAR_HEIGHT = 20;

export default function LargeBarChart({ labels = [], dataset = [] }: Props) {
  const max = _.maxBy(dataset, (item) => Math.abs(item)) || 20;
  const min = _.minBy(dataset, (item) => Math.abs(item)) || 20;

  const areAllTheSame = max === min ? true : false;

  const transformedData = areAllTheSame
    ? [MIN_BAR_HEIGHT, MIN_BAR_HEIGHT, MIN_BAR_HEIGHT]
    : dataset.map((item) => {
        if (Math.abs(item) === max) return MAX_BAR_HEIGHT * (item / max);
        else if (Math.abs(item) === min) return MIN_BAR_HEIGHT * (item / min);
        else {
          return (item / (max - min)) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);
        }
      });

  console.log('@@@Transformed:', transformedData);

  const barBg = (data: any) => {
    let colors = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= 0) {
        colors.push(theme.color.chart.up);
      } else {
        colors.push(theme.color.chart.down);
      }
    }
    return colors;
  };

  const dataLabelAnchor = (data: any) => {
    let anchor = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= 0) {
        anchor.push('end');
      } else {
        anchor.push('start');
      }
    }
    return anchor;
  };
  const data = {
    labels: labels,
    datasets: [
      {
        maxBarThickness: 40,
        data: transformedData,
        borderRadius: 8,
        backgroundColor: barBg(dataset),
        datalabels: {
          color: barBg(dataset),
          anchor: dataLabelAnchor(dataset),
          // offset: [0, -25, -25],
          align: dataLabelAnchor(dataset),
        },
        borderSkipped: false,
      },
    ],
  };

  return (
    <div>
      {Array.isArray(labels) && labels.length > 0 && (
        <div
          css={css`
            display: flex;
            justify-content: space-around;
            padding: ${theme.metrics.m6};
          `}
        >
          {labels.map((data) => (
            <div
              key={data}
              css={css`
                ${theme.fonts.s14_w500};
                color: ${theme.color.gray.w800};
                text-align: center;
                width: 50px;
              `}
            >
              {data}
            </div>
          ))}
        </div>
      )}
      <div>
        <Chart
          height={'300px'}
          type="bar"
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                formatter: (value, context) => {
                  return `${priceToString(dataset[context.dataIndex].toFixed(0))}백만원`;
                },
                font: {
                  size: 14,
                  weight: 500,
                },
              },
            },
            animation: false,
            layout: {
              padding: {
                left: 24,
                right: 24,
                top: 24 + 12,
                bottom: 24 + 12,
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
                beginAtZero: true,
                grid: {
                  display: true,
                  offset: false,
                },
              },
            },
          }}
          //@ts-ignore
          data={data}
          width={'100%'}
        />
      </div>
    </div>
  );
}
