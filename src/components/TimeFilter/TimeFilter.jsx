import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

import options from '../../constants/filterOptions.json';

/**
 * This component is used for filtering chart based on avaible time options
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 *
 */
function TimeFilter({ setTime }) {
  /**
   * This component has time filters to filter the graph by time such as
   * 1 minute, 3 minutes, 5 minutes, 30 minutes, 1 Hour, 1 day, 1 month,
   * 1 year and many more
   *
   * selectedOption : string of the time filter selected by the user
   * setselectedOption : function to trigger the filter when the user selects the time frame
   * fixedButtons : displays which filter is currently selected
   * fixedSelection : default time frame for which the graph renders in the beginning
   * onSelectOption : function to change the values of setselectedOption and setTime
   * after the user changes the time filter
   */
  const [selectedOption, setselectedOption] = useState('');
  const fixedButtons = [0, 4, 7];
  const fixedSelection =
    selectedOption === '' ||
    fixedButtons.filter((idx) => options[idx].name === selectedOption).length >
      0;

  const onSelectOption = (option) => {
    setselectedOption(option.name);
    setTime(option.value);
  };

  return (
    <ButtonGroup className="me-3" aria-label="First group">
      {fixedButtons.map((index) => (
        <Button
          key={index}
          variant="outline-secondary"
          active={selectedOption === options[index].name}
          onClick={() => onSelectOption(options[index])}
        >
          {options[index].name}
        </Button>
      ))}

      {fixedSelection && (
        <Button
          variant="outline-secondary"
          active={selectedOption === 'D'}
          onClick={() => onSelectOption(options[12])}
        >
          D
        </Button>
      )}

      {!fixedSelection && (
        <Button variant="outline-secondary" active>
          {selectedOption}
        </Button>
      )}

      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          variant="outline-secondary"
          data-testid="time-dropdown"
        />
        <Dropdown.Menu variant="dark" data-testid="dropdown-menu">
          {options.map((op, index) =>
            op.label === '_' ? (
              <Dropdown.Divider key={op.name} />
            ) : (
              <Dropdown.Item
                key={op.name}
                active={selectedOption === op.name}
                eventKey={index.toString()}
                onClick={() => onSelectOption(op)}
                data-testid={op.name}
              >
                {op.label}
              </Dropdown.Item>
            ),
          )}
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
}

export default TimeFilter;

TimeFilter.propTypes = {
  /**
   * time setting function
   */
  setTime: PropTypes.func.isRequired,
};
