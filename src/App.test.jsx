import { render, screen } from '@testing-library/react';
import React from 'react';

import './matchMedia';
import App from './App';

describe('app Component', () => {
  it('should render the whole app', () => {
    render(<App />);
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});
