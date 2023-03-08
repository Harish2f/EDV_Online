import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ModalIndicators from './ModalIndicators';

/**
 * This component tests the functioning of the Indicator Modal
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('indicators Component', () => {
  /**
   * Test to check if the Moving Average Indicator is added to the
   * graph as the user selects from the top menu
   */
  it('should add Moving Average indicator', async () => {
    expect.hasAssertions();
    render(<ModalIndicators setSelectedIndicators={() => {}} />);

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    const maLegend = screen.queryByText('Indicators');
    expect(maLegend).toBeInTheDocument();
  });
});
