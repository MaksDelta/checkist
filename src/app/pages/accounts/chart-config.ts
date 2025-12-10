import { ChartConfiguration } from 'chart.js';

export const lineChartConfig: ChartConfiguration<'line'> = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: '',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        borderColor: '#1372d2',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Historical trend',
        color: '#ffffffff',
        font: {
          size: 30,
          weight: 'lighter',
        },
        align: 'start',
        position: 'top',
        padding: { top: 10, bottom: 10 },
      },
    },
    layout: { padding: 0 },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#ffffffff' },
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
      },
    },
  },
};
