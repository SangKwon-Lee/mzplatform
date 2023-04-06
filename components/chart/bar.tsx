import { css } from '@emotion/react';
import theme from '../../commons/theme';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, LineElement, Legend, LineController, BarController, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { geKoreanNumber } from '../../commons/utils';
import _ from 'lodash';

ChartJS.register(LinearScale, CategoryScale, BarElement, LineElement, LineController, BarController, Legend, PointElement, ChartDataLabels);

interface Props {
  labels: string[];
  dataset: number[];
}
const MAX_BAR_HEIGHT = 90;
const MIN_BAR_HEIGHT = 10;

export default function BarChart({ labels = [], dataset = [] }: Props) {
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

  const barBg = (data: any) => {
    let colors = [];
    if (Array.isArray(data) && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] >= 0) {
          colors.push(theme.color.chart.up);
        } else {
          colors.push(theme.color.chart.down);
        }
      }
    }
    return colors;
  };

  const dataLabelAnchor = (data: any) => {
    let anchor = [];
    if (Array.isArray(data) && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        if (data[i] >= 0) {
          anchor.push('end');
        } else {
          anchor.push('start');
        }
      }
    }
    return anchor;
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: transformedData,
        borderRadius: 8,
        backgroundColor: barBg(dataset),
        datalabels: {
          color: barBg(dataset),
          anchor: dataLabelAnchor(dataset),
          offset: [0, 0, 0],
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
            justify-content: center;
          `}
        >
          {labels.map((data) => (
            <div
              key={data}
              css={css`
                ${theme.fonts.s14_w500};
                color: ${theme.color.gray.w800};
                flex: 1;
                text-align: center;
              `}
            >
              {data}
            </div>
          ))}
        </div>
      )}
      <div>
        <Chart
          height={'100%'}
          type="bar"
          options={{
            animations: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true,
              },
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 30,
                bottom: 15,
              },
            },
            bar: {
              datasets: {
                minBarLength: 100,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                formatter: (value, context) => {
                  return `${geKoreanNumber(dataset[context.dataIndex] * 100000000)}`;
                },
                font: {
                  size: 12,
                  weight: 500,
                },
              },
            },
            animation: false,
            scales: {
              // yAxes: [
              //   {
              //     minBarLength: 200,
              //     ticks: {
              //       reverse: false,
              //     },
              //   },
              // ],
              x: {
                display: false,
                // min: 10,
                beginAtZero: true,
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
