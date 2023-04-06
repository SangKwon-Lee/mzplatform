import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import theme from '../../commons/theme';

interface FeddChartProps {
  labels: string[];
  datasets: number[];
}

export default function FeedChart({ datasets, labels }: FeddChartProps) {
  function getGradient(ctx: any) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, theme.color.chart.up20);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    return gradient;
  }

  const config = {
    type: 'line',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 1,
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: datasets,
        lineTension: 0.4,
        borderColor: theme.color.chart.up,
        fill: 'start',
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx } = chart;
          return getGradient(ctx);
        },
      },
    ],
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

  return (
    <div>
      {labels.length > 0 && datasets.length > 0 && Array.isArray(labels) && Array.isArray(datasets) ? (
        <Line data={data} options={config} width={'100%'} />
      ) : (
        <></>
      )}
    </div>
  );
}
