import { screen, render, fireEvent } from '@testing-library/react';

import Legends from './Legends';

describe('<Configuration />', () => {
  it('renders correctly with legends', () => {
    const legends = [
      {
        id: 1,
        name: 'Legend 1',
        color: '#000000',
        row: 0,
        col: 0,
      },
      {
        id: 2,
        name: 'Legend 2',
        color: '#ffffff',
        row: 0,
        col: 1,
      },
    ];

    const legendIndicators = {
      'Legend 1': [],
      'Legend 2': [],
    };

    render(
      <Legends
        legends={legends}
        legendIndicators={legendIndicators}
        onRemoveChart={jest.fn()}
        showAddIndicatorForVariableModal={() => {}}
      />,
    );

    expect(screen.getByTestId('Legend 1')).toBeInTheDocument();
    expect(screen.getByTestId('Legend 2')).toBeInTheDocument();
    expect(screen.getByText('Legend 1')).toBeInTheDocument();
    expect(screen.getByText('Legend 2')).toBeInTheDocument();
  });

  it('calls onRemoveChart when remove button is clicked', () => {
    const onRemoveChart = jest.fn();
    const legends = [
      {
        id: 1,
        name: 'Legend 1',
        color: '#000000',
        row: 0,
        col: 0,
      },
    ];

    const legendIndicators = {
      C03_Calc_Notch: [],
    };

    render(
      <Legends
        legends={legends}
        legendIndicators={legendIndicators}
        onRemoveChart={onRemoveChart}
        showAddIndicatorForVariableModal={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('remove-chart'));

    expect(onRemoveChart).toHaveBeenCalledWith(0, 0);
  });
});
