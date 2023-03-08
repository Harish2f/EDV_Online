import { render, screen } from '@testing-library/react';
import React from 'react';

import LineChart from './LineChart';
import '../../matchMedia';

/**
 * This component tests the functioning of the line chart
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('lineChart Component', () => {
  /**
   * Test to check if the line chart is rendered and plotted for the variable C03_Calc_Notch
   */
  it('should render chart', () => {
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

    render(<LineChart chartData={chartData} height="50vh" />);
    const chart = screen.getByTestId('chart');
    expect(chart).toBeInTheDocument();
  });
});
