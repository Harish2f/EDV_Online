import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ModalSearch from './ModalSearch';

/**
 * This component tests the functioning of the Search Modal
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

describe('navBar Component', () => {
  /**
   * Test to check if the search modal is rendered on clicking search
   */
  it('should render nav bar', () => {
    const setTime = () => {};
    const setSelectedModal = () => {};
    const setShowToast = () => {};
    const selectedItemModal = [];
    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const navBar = screen.getByTestId('nav-bar');
    expect(navBar).toBeInTheDocument();
  });

  it('should show search modal', async () => {
    /**
     * Test to check if the search option in the modal works and
     * displays appropriate variables based on the search by the user
     */
    expect.hasAssertions();
    const setTime = () => {};
    const setSelectedModal = () => {};
    const setShowToast = () => {};
    const selectedItemModal = [];
    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();
  });

  it('should select all option from search modal', async () => {
    /**
     * Test to check if the All option renders all the available
     * variables from the data in a single column for the user to select.
     */
    expect.hasAssertions();
    const setTime = () => {};
    const setSelectedModal = () => {};
    const setShowToast = () => {};
    const selectedItemModal = [];
    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const allBtn = await screen.findByTestId('all-options');
    fireEvent.click(allBtn);

    const allOptions = await screen.findAllByRole('listitem');
    expect(allOptions).toHaveLength(85);
  });

  it('should select ZCH1 option from search modal', async () => {
    /**
     * Test to check if the selection of variable from search modal
     * works by clicking on variable ZCH1
     */
    expect.hasAssertions();
    const setTime = () => {};
    const setSelectedModal = () => {};
    const setShowToast = () => {};
    const selectedItemModal = [];
    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const zchBtn = await screen.findByTestId('ZCH1');
    fireEvent.click(zchBtn);

    const zchOptions = await screen.findAllByRole('listitem');
    expect(zchOptions).toHaveLength(1);
  });

  it('should select C03_Calc_Notch with same axis', async () => {
    /**
     * Test to check if the same axis option works in the search modal by
     * selecting the variable C03_Calc_Notch to plot in the major axis.
     */
    expect.hasAssertions();
    const setTime = () => {};
    const setShowToast = () => {};
    let selectedItemModal = [];

    const setSelectedModal = (modals) => {
      [selectedItemModal] = modals();
    };

    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(c03CalcNotchBtn);

    expect(selectedItemModal).toStrictEqual(['c03_calc_notch']);
  });

  it('should add dcb_heatsink_temperature with same axis', async () => {
    /**
     * Test to check if the same axis option works in the search modal by
     * selecting the variable C03_Calc_Notch to plot in the major axis.
     */
    expect.hasAssertions();
    const setTime = () => {};
    const setShowToast = () => {};
    let selectedItemModal = [['c03_calc_notch']];
    const setSelectedModal = (modals) => {
      selectedItemModal = modals();
    };

    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'DCB_HeatSink_Temperature' } });

    const dCBHeatSinkTempBtn = await screen.findByTestId('same-axis-btn');
    fireEvent.click(dCBHeatSinkTempBtn);

    expect(selectedItemModal).toStrictEqual([
      ['c03_calc_notch', 'dcb_heatsink_temperature'],
    ]);
  });

  it('should select C03_Calc_Notch with new pane', async () => {
    /**
     * Test to check if the New Pane option works in the search modal
     * by selecting the variable C03_Calc_Notch to plot below the
     * main axis to compare the both variables
     */
    expect.hasAssertions();
    const setTime = () => {};
    const setShowToast = () => {};
    let selectedItemModal = [];

    const setSelectedModal = (modals) => {
      [selectedItemModal] = modals();
    };

    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    let searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchBtn);

    fireEvent.click(searchBtn);
    searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();
    expect(selectedItemModal).toStrictEqual(['c03_calc_notch']);
  });

  it('should not select C03_Calc_Notch with new pane after reaching limit', async () => {
    /**
     * Test to check if the New Pane option is working in the search modal after selecting
     * 3 variables already through the New pane option. C03_Calc_Notch is selected and checked
     * whether it plots or displays the error message toast.
     */
    expect.hasAssertions();
    let showToast = false;
    const setTime = () => {};
    const setShowToast = (val) => {
      showToast = val;
    };
    const selectedItemModal = [
      ['C13_Power'],
      ['STARTING_BAT'],
      ['ZTIN1_kgf'],
      ['ECM_Engine_Load'],
    ];

    const setSelectedModal = () => {};

    render(
      <ModalSearch
        setTime={setTime}
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setShowToast={setShowToast}
        setSelectedIndicators={() => {}}
        isAddingIndicatorForVariable={false}
        addIndicatorForVariable={() => {}}
      />,
    );

    const searchBtn = screen.getByTestId('search-symbol');
    fireEvent.click(searchBtn);

    const searchModal = await screen.findByTestId('search-modal');
    expect(searchModal).toBeInTheDocument();

    const input = await screen.findByTestId('seacrh-input');
    fireEvent.change(input, { target: { value: 'C03_Calc_Notch' } });

    const c03CalcNotchBtn = await screen.findByTestId('new-pane-btn');
    fireEvent.click(c03CalcNotchBtn);

    expect(showToast).toBe(true);
  });
});
