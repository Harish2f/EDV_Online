import React from 'react';

import LineChart from '../components/LineChart/LineChart';

export default {
  title: 'LineChart',
  component: LineChart,
};

export function LineChartDemo() {
  const chartData = [
    {
      color: '#36a2eb',
      name: 'C03_Calc_Notch',
      items: [
        { time: 1670512180079, value: 80.01 },
        { time: 1670512182181, value: 96.63 },
        { time: 1670512184297, value: 76.64 },
      ],
      pane: 0,
    },
  ];
  return <LineChart chartData={chartData} />;
}
