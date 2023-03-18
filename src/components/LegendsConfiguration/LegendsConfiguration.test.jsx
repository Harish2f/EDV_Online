import { fireEvent, render, screen, within } from '@testing-library/react';

import '../../matchMedia';
import LegendsConfiguration from './LegendsConfiguration';

/**
 * This component tests the functioning of the legends configuration
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('configuration Component', () => {
  /**
   * Test to check if the toast is working and displaying message
   */
  it('should render error toast', () => {
    render(<LegendsConfiguration />);
    const chart = screen.getByTestId('chart-container');
    expect(chart).toBeInTheDocument();
  });

  it("should select C03_Calc_Notch with same axis and show it's legend", async () => {
    /**
     * Test to check if the legend is displayed for C03_Calc_Notch
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();
  });

  it('should select ZIT1_Max_Temperature, a symbol with out legend', async () => {
    /**
     * Test to check whether the legend is not displayed in any case for for ZIT1_Max_Temperature
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'ZIT1_Max_Temperatured' } });

    const ZIT1MaxTemperaturedBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(ZIT1MaxTemperaturedBtn);

    const legend = await screen.findByTestId('ZIT1_Max_Temperatured');
    expect(legend).toBeInTheDocument();
  });

  it('should display capacity limit reached toast', async () => {
    /**
     * Test to check whether too many variables are selected
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);
    [
      'C03_Calc_Notch',
      'C03_Calc_Notch',
      'C03_Calc_Notch',
      'C03_Calc_Notch',
      'C03_Calc_Notch',
    ].forEach(async (symbol) => {
      const searchBtn = screen.getByTestId('search-symbol');
      fireEvent.click(searchBtn);

      const searchModal = await screen.findByTestId('search-modal');
      expect(searchModal).toBeInTheDocument();

      const input = await screen.findByTestId('seacrh-input');
      fireEvent.change(input, { target: { value: symbol } });

      const btn = await screen.findByTestId('new-pane-btn');
      fireEvent.click(btn);
    });

    const toast = await screen.findByTestId('toast-header');
    const closeBtn = await within(toast).findByRole('button');
    fireEvent.click(closeBtn);
  });

  it('should select one minute time filter', async () => {
    /**
     * Test to check if one minute time filter is working
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);
    ['C03_Calc_Notch', 'DCB_HeatSink_Temperature'].forEach(async (symbol) => {
      const searchBtn = screen.getByTestId('search-symbol');
      fireEvent.click(searchBtn);

      const searchModal = await screen.findByTestId('search-modal');
      expect(searchModal).toBeInTheDocument();

      const input = await screen.findByTestId('seacrh-input');
      fireEvent.change(input, { target: { value: symbol } });

      const btn = await screen.findByTestId('new-pane-btn');
      fireEvent.click(btn);
    });

    const oneMinBtn = screen.getByRole('button', { name: '1m' });
    fireEvent.click(oneMinBtn);
    const activeBtn = screen.getByRole('button', { name: '1m' });

    expect(activeBtn).toHaveClass('active');
  });

  it("should remove C03_Calc_Notch with same axis and it's legend after adding it", async () => {
    /**
     * Test to check whether the graph of C03_Calc_Notch is removed while clicking on
     * close button from the legend
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    const closeBtn = await screen.findByTestId('remove-chart');
    fireEvent.click(closeBtn);

    const oldlegend = screen.queryByTestId('C03_Calc_Notch');
    expect(oldlegend).not.toBeInTheDocument();
  });

  it('should add Moving Average indicator on C03_Calc_Notch', async () => {
    /**
     * Test to check whether the graph of C03_Calc_Notch is plotted with moving average indicator
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    const maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).toBeInTheDocument();
  });

  it('should change different len for Moving Average indicator on C03_Calc_Notch', async () => {
    /**
     * Test to check whether the moving average of C03_Calc_Notch is changed
     * while changing the length option for the moving average
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    const maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).toBeInTheDocument();

    const maGearBtn = await screen.findByTestId('settings-MA');
    fireEvent.click(maGearBtn);

    const mainput = await screen.findByTestId('ma-input');
    fireEvent.change(mainput, { target: { value: '3' } });

    const okBtn = await screen.findByText('Ok');
    fireEvent.click(okBtn);
  });

  it('should cancel len modal for Moving Average indicator on C03_Calc_Notch', async () => {
    /**
     * Test to check whether the cancel option while editing the length of
     * moving average of C03_Calc_Notch is cancelled by clicking on it and
     * the toast is closed
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    const maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).toBeInTheDocument();

    const maGearBtn = await screen.findByTestId('settings-MA');
    fireEvent.click(maGearBtn);

    const mainput = await screen.findByTestId('ma-input');
    fireEvent.change(mainput, { target: { value: '3' } });

    const okBtn = await screen.findByText('Cancel');
    fireEvent.click(okBtn);
  });

  it('should change remove Moving Average indicator on C03_Calc_Notch', async () => {
    /**
     * Test to check whether the moving average of C03_Calc_Notch is removed by
     * clicking on the close button from the indicator legend
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    let maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).toBeInTheDocument();

    const maGearBtn = await screen.findByTestId('remove-C03_Calc_Notch1');
    fireEvent.click(maGearBtn);

    maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).not.toBeInTheDocument();
  });

  it('should search Moving Average indicator', async () => {
    /**
     * Test to check whether the moving average is displayed on the indicator menu
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const searchInput = await screen.findByTestId('seacrh-input');
    fireEvent.change(searchInput, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const input = await screen.findByTestId('seacrh-input-2');
    fireEvent.change(input, { target: { value: 'Moving' } });

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    const maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).toBeInTheDocument();
  });

  it('should remove "Moving Average" separately on C03_Calc_Notch and  DCB_HeatSink_Temperature', async () => {
    /**
     * Test to check whether only removed the clicked indicator
     * clicking on the close button from the indicator legend
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    let legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'DCB_HeatSink_Temperature' } });

    const dcbHeatSinkTemperatureBtn = await screen.findByTestId(
      'same-axis-btn',
    );
    fireEvent.click(dcbHeatSinkTemperatureBtn);

    legend = await screen.findByTestId('DCB_HeatSink_Temperature');
    expect(legend).toBeInTheDocument();

    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    let maLegend = screen.queryByTestId('C03_Calc_NotchMA');
    expect(maLegend).toBeInTheDocument();

    const maGearBtn = await screen.findByTestId('remove-C03_Calc_Notch1');
    fireEvent.click(maGearBtn);

    maLegend = screen.queryByTestId('DCB_HeatSink_TemperatureMA');
    expect(maLegend).toBeInTheDocument();
  });

  it('add variables by "Same Axis",only if there was not one before', async () => {
    /**
     * Test to check duplicated variables was not added
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    // add C03_Calc_Notch second time
    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn1 = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn1);

    expect(screen.queryAllByRole('generic', { name: 'legend' })).toHaveLength(
      1,
    );
  });

  it('should have all added indicators, when after added indicators, then add a variable', async () => {
    /**
     * Test to check newly added variables have all added indicators
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);
    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();
    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });
    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();
    fireEvent.click(legend);

    let indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);
    expect(maBtn).toBeInTheDocument();

    indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const emaBtn = await screen.findByText('Exponential Moving Average');
    fireEvent.click(emaBtn);

    const c03CalcNotchMA = await screen.findByTestId('C03_Calc_NotchMA');
    expect(c03CalcNotchMA).toBeInTheDocument();

    const c03CalcNotchEMA = await screen.findByTestId('C03_Calc_NotchEMA');
    expect(c03CalcNotchEMA).toBeInTheDocument();
  });

  it('should share indicators, when variables added by new pane', async () => {
    /**
     * Test to check variables added by new pane, still share indicators
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();
    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchNewPaneBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchNewPaneBtn);

    screen
      .queryAllByRole('generic', { name: 'legend' })
      .forEach((addedLegend) => {
        fireEvent.click(addedLegend);
      });
    const indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    expect(
      screen.queryAllByRole('generic', { name: 'indicator' }),
    ).toHaveLength(2);
  });

  it('should remove indicator together, when variables added by new pane', async () => {
    /**
     * Test to check variables added by new pane, still share indicators
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchNewPaneBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchNewPaneBtn);

    let indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const emaBtn = await screen.findByText('Exponential Moving Average');
    fireEvent.click(emaBtn);

    screen
      .queryAllByRole('generic', { name: 'legend' })
      .forEach((addedLegend) => {
        fireEvent.click(addedLegend);
      });

    let indicators = screen.queryAllByRole('generic', { name: 'indicator' });
    expect(indicators).toHaveLength(4);

    const removeBtn = screen.queryAllByRole('button', {
      name: 'remove-button',
    })[0];
    fireEvent.click(removeBtn);

    indicators = screen.queryAllByRole('generic', { name: 'indicator' });
    expect(indicators).toHaveLength(2);
  });

  it('can remove indicator from newly added variable by new pane', async () => {
    /**
     * Test to check variables added by new pane, still share indicators
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchNewPaneBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchNewPaneBtn);

    let indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const emaBtn = await screen.findByText('Exponential Moving Average');
    fireEvent.click(emaBtn);

    indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const smaBtn = await screen.findByText('Smoothed Moving Average');
    fireEvent.click(smaBtn);

    screen
      .queryAllByRole('generic', { name: 'legend' })
      .forEach((addedLegend) => {
        fireEvent.click(addedLegend);
      });

    let indicators = screen.queryAllByRole('generic', { name: 'indicator' });
    expect(indicators).toHaveLength(6);

    const removeBtn = screen.queryAllByRole('button', {
      name: 'remove-button',
    })[0];
    fireEvent.click(removeBtn);

    indicators = screen.queryAllByRole('generic', { name: 'indicator' });
    expect(indicators).toHaveLength(4);
  });

  it('should clear all indicators', async () => {
    /**
     * Test to check 'clear all indicators' feature
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchNewPaneBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchNewPaneBtn);

    let indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const emaBtn = await screen.findByText('Exponential Moving Average');
    fireEvent.click(emaBtn);

    indicatorsBtn = await screen.findByText('Indicators');
    fireEvent.click(indicatorsBtn);

    const smaBtn = await screen.findByText('Smoothed Moving Average');
    fireEvent.click(smaBtn);

    screen
      .queryAllByRole('generic', { name: 'legend' })
      .forEach((addedLegend) => {
        fireEvent.click(addedLegend);
      });

    let indicators = screen.queryAllByRole('generic', { name: 'indicator' });
    expect(indicators).toHaveLength(6);

    const clearAllIndicatorsBtn = screen.getByText('Clear All Indicators');
    fireEvent.click(clearAllIndicatorsBtn);

    indicators = screen.queryAllByRole('generic', { name: 'indicator' });
    expect(indicators).toHaveLength(0);
  });

  it('should only add "Moving Average" to  "C03 CALC Notch", not to "DCB HeatSink Temperature"', async () => {
    /**
     * Test to check 'add indicator for variable' feature
     */
    expect.hasAssertions();
    render(<LegendsConfiguration />);

    let searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    let input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    const legend = await screen.findByTestId('C03_Calc_Notch');
    expect(legend).toBeInTheDocument();

    searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    await screen.findByTestId('search-modal');

    input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'DCB_HeatSink_Temperature' } });

    const dcbHeatSinkTemperatureBtn = await screen.findByTestId(
      'same-axis-btn',
    );
    fireEvent.click(dcbHeatSinkTemperatureBtn);

    screen
      .queryAllByRole('generic', { name: 'legend' })
      .forEach((addedLegend) => {
        fireEvent.click(addedLegend);
      });

    const addIndicatorForBtn = await screen.findByTestId(
      'addIndicatorForC03_Calc_Notch',
    );
    fireEvent.click(addIndicatorForBtn);

    const maBtn = await screen.findByText('Moving Average');
    fireEvent.click(maBtn);

    const c03CalcNotchMA = await screen.findByTestId('C03_Calc_NotchMA');
    expect(c03CalcNotchMA).toBeInTheDocument();

    const dcbHeatSinkTemperatureMA = screen.queryByTestId(
      'DCB_HeatSink_TemperatureMA',
    );
    expect(dcbHeatSinkTemperatureMA).not.toBeInTheDocument();
  });
});
