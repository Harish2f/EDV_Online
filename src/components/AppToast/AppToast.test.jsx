import { render, screen } from '@testing-library/react';
import React from 'react';

import AppToast from './AppToast';

/**
 * This component tests whether a message is displayed on UI
 * when user selects more than 3 variables through 'New Pane' option
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('appToast Component', () => {
  /**
   * Test to check if an error message is displayed in a toast as described above
   */
  it('should render error toast', () => {
    const show = true;

    render(<AppToast show={show} onClose={() => {}} />);

    const headerTitle = screen.getByText(
      "Can't compare more than 3 variables!",
    );

    expect(headerTitle).toBeInTheDocument();
  });
});
