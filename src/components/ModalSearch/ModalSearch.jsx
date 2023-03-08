import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

import data from '../../constants/data.json';
import { getGroupName } from '../../helpers';
import ModalIndicators from '../ModalIndicators/ModalIndicators';
import TimeFilter from '../TimeFilter/TimeFilter';
import {
  I,
  Input,
  ModalHeader,
  OptionButton,
  SearchBar,
  NavBarButton,
  Img,
  Symbol,
  UL,
  AppNavBar,
} from './ModalSearch.styles';

/**
 * This component is used for rendering the nav bar
 * which contains search button where all variables are displayed
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */
function ModalSearch({
  /**
   * Displays Modal by grouping the available variables in the data based on their first word and available for the user to select their choice to plot the line chart.
   *
   * setTime : timeframe for which the data has to be loaded from the server
   * selectedItemModal : string of the variable selected by the user
   * setSelectedModal : function to trigger the closing of the modal
   * after a variable is selected
   * setShowToast : boolean value, displays the modal when clicked
   * setSelectedIndicators : array of indicators to be made available for the variables
   * show : boolean value to show the NavBar modal
   * handleShow : function to show the modal from the top menu
   * handleClose : function to close the modal in the top menu
   */
  setTime,
  selectedItemModal,
  setSelectedModal,
  setShowToast,
  setSelectedIndicators,
}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  let dataObjs = Object.keys(data.metadata);
  dataObjs = dataObjs.map((item) => item.toLowerCase());
  const [suggestions, setSuggestions] = useState([]);
  const [groups, setGroups] = useState({});

  const handleChange = ({ target: { value } }) => {
    const tempArr = dataObjs.filter(
      (item) => value !== '' && item.includes(value.toLowerCase()),
    );
    setSuggestions(tempArr);
  };

  const handleButtonValue = (val) => {
    if (val === 'ALL') {
      const tempNewArr = dataObjs;
      setSuggestions(tempNewArr);
    } else if (val) {
      const tempNewArr = dataObjs.filter((item) =>
        item.includes(val.toLowerCase()),
      );
      setSuggestions(tempNewArr);
    }
  };

  const handleSameAxis = (item) => {
    const items = [...selectedItemModal];
    if (items.length > 0) {
      if (items[0].findIndex((existingItem) => item === existingItem) === -1) {
        items[0] = [...items[0], item];
      }
    } else {
      items[0] = [item];
    }

    setSelectedModal(() => items);
    handleClose();
  };

  const handleNewPane = (item) => {
    if (selectedItemModal.length >= 4) {
      setShowToast(true);
      return;
    }
    setSelectedModal(() => [...selectedItemModal, [item]]);
    handleClose();
  };

  useEffect(() => {
    const newGroups = {};
    Object.keys(data.metadata).forEach((symbol) => {
      const key = getGroupName(symbol).toUpperCase();
      if (!newGroups[key]) {
        newGroups[key] = [];
      }
      newGroups[key].push(symbol);
    });
    setGroups(newGroups);
  }, []);

  return (
    <>
      <AppNavBar bg="dark" variant="dark" data-testid="nav-bar">
        <Container className="justify-content-start">
          <NavBarButton
            variant="secondary"
            data-testid="search-symbol"
            className="d-flex justify-content-between align-items-center me-3"
            onClick={handleShow}
          >
            <Img
              alt="search-img"
              src="/image/search.png"
              width={20}
              height={20}
            />
            Search
          </NavBarButton>
          <TimeFilter setTime={setTime} />
          <ModalIndicators setSelectedIndicators={setSelectedIndicators} />
        </Container>
      </AppNavBar>

      <Modal show={show} onHide={handleClose}>
        <div className="bg-dark text-white" data-testid="search-modal">
          <ModalHeader closeButton closeVariant="white">
            <Modal.Title>Symbol Search</Modal.Title>
          </ModalHeader>
          <SearchBar>
            <I className="fa fa-search" aria-hidden="true" />
            <Input
              data-testid="seacrh-input"
              type="input"
              placeholder="Search"
              onChange={handleChange}
            />
          </SearchBar>
          <Modal.Body>
            <OptionButton
              type="button"
              data-testid="all-options"
              onClick={() => handleButtonValue('ALL')}
            >
              All
            </OptionButton>
            {Object.keys(groups).map((item) => (
              <OptionButton
                type="button"
                data-testid={item}
                key={item}
                onClick={() => handleButtonValue(item)}
              >
                {item}
              </OptionButton>
            ))}
            <UL data-testid="list">
              {suggestions.map((item) => (
                <li key={item} className="list-unstyled">
                  {item !== 'edv' && (
                    <>
                      <Symbol>{item}</Symbol>
                      <OptionButton
                        type="button"
                        data-testid="same-axis-btn"
                        onClick={() => handleSameAxis(item)}
                      >
                        Same axis
                      </OptionButton>
                      <OptionButton
                        type="button"
                        data-testid="new-pane-btn"
                        onClick={() => handleNewPane(item)}
                      >
                        New pane
                      </OptionButton>
                    </>
                  )}
                </li>
              ))}
            </UL>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default ModalSearch;

ModalSearch.propTypes = {
  /**
   * selected symbols from the search modal
   */
  selectedItemModal: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  /**
   * function to select and set symbols from search modal
   */
  setSelectedModal: PropTypes.func.isRequired,
  /**
   * a function to setTime that will be passed
   * to the Filter component
   */
  setTime: PropTypes.func.isRequired,
  /**
   * a function to set vsibility of toast (chart limit notifier toast)
   */
  setShowToast: PropTypes.func.isRequired,
  setSelectedIndicators: PropTypes.func.isRequired,
};
