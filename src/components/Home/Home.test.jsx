import { render, screen } from '@testing-library/react';
import React from 'react';

import '../../matchMedia';
import Home from './Home';

/**
 * This component tests if landing page is rendered without crashing and everything in the app is rendered like Search Modal, Time Filter, Indicators menu
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('tradingview Component', () => {
  it('should render the whole app', () => {
    render(<Home />);
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});
