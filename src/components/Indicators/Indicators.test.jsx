import { screen, render, fireEvent } from '@testing-library/react';

import Indicators from './Indicators';

describe('indicators component', () => {
  it('renders correctly with indicators', () => {
    const indicators = [
      { name: 'SMA', sym: 'sma' },
      { name: 'EMA', sym: 'ema' },
    ];
    const onRemoveIndicator = jest.fn();
    const setshowIndicatorModal = jest.fn();
    render(
      <Indicators
        indicators={indicators}
        onRemoveIndicator={onRemoveIndicator}
        setshowIndicatorModal={setshowIndicatorModal}
      />,
    );
    expect(screen.getByTestId('sma')).toBeInTheDocument();
    expect(screen.getByTestId('ema')).toBeInTheDocument();
  });

  it('calls onRemoveIndicator and setshowIndicatorModal when buttons are clicked', () => {
    const indicators = [{ name: 'SMA', sym: 'sma' }];
    const onRemoveIndicator = jest.fn();
    const setshowIndicatorModal = jest.fn();
    render(
      <Indicators
        indicators={indicators}
        onRemoveIndicator={onRemoveIndicator}
        setshowIndicatorModal={setshowIndicatorModal}
      />,
    );
    fireEvent.click(screen.getByTestId('remove-sma'));
    expect(onRemoveIndicator).toHaveBeenCalledWith('SMA');
    fireEvent.click(screen.getByTestId('settings-sma'));
    expect(setshowIndicatorModal).toHaveBeenCalledWith(true);
  });
});
