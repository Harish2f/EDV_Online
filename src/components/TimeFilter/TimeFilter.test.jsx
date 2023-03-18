import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TimeFilter from './TimeFilter';

/**
 * This component tests the functioning of the Time Filter component
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('filter Component', () => {
  it('should render initial time filter options', () => {
    /**
     * Test to check if the line chart is rendered for the default time frame
     */
    render(<TimeFilter setTime={() => {}} />);

    const oneMin = screen.getByText('1m');
    const thrtyMin = screen.getByText('30m');
    const oneHr = screen.getByText('1h');
    const oneDay = screen.getByText('D');

    expect(oneMin).toBeInTheDocument();
    expect(thrtyMin).toBeInTheDocument();
    expect(oneHr).toBeInTheDocument();
    expect(oneDay).toBeInTheDocument();
  });

  it('should select one minute filter', () => {
    /**
     * Test to check if the line chart is rendered for the 'one minute' time frame
     */
    render(<TimeFilter setTime={() => {}} />);

    const oneMinBtn = screen.getByRole('button', { name: '1m' });
    fireEvent.click(oneMinBtn);
    const activeBtn = screen.getByRole('button', { name: '1m' });

    expect(activeBtn).toHaveClass('active');
  });

  it('should show dropdown time filter options', async () => {
    /**
     * Test to check if the dropdown option is rendered for different time frames
     * showing as 1m, 3m, 5m, 10m, 30m, 1Hr, 2Hrs, 1 day, 1 month, 1 year and many more
     */
    expect.hasAssertions();
    render(<TimeFilter setTime={() => {}} />);

    const dropdownBtn = screen.getByTestId('time-dropdown');
    fireEvent.click(dropdownBtn);

    const dropdownMenu = await screen.findByTestId('dropdown-menu');
    expect(dropdownMenu).toBeInTheDocument();
  });

  it('should select one day time filter option', () => {
    /**
     * Test to check if the line chart is rendered for the 'one day' time frame
     */
    render(<TimeFilter setTime={() => {}} />);

    const oneMinBtn = screen.getByRole('button', { name: 'D' });
    fireEvent.click(oneMinBtn);
    const activeBtn = screen.getByRole('button', { name: 'D' });

    expect(activeBtn).toHaveClass('active');
  });

  it('should show select one year time filter option', async () => {
    /**
     * Test to check if the line chart is rendered for the 'one year' time frame
     */
    expect.hasAssertions();
    render(<TimeFilter setTime={() => {}} />);

    const dropdownBtn = screen.getByTestId('time-dropdown');
    fireEvent.click(dropdownBtn);

    const dropdownMenu = await screen.findByTestId('dropdown-menu');
    expect(dropdownMenu).toBeInTheDocument();

    const oneYearButton = await screen.findByTestId('Y');
    fireEvent.click(oneYearButton);

    const activeBtn = screen.getByRole('button', { name: 'Y' });
    expect(activeBtn).toHaveClass('active');
  });
});
