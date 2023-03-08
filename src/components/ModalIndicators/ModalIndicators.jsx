import { ma, dma, ema, sma, wma } from 'moving-averages-js';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ModalHeader, Modal, Button, ListGroup } from 'react-bootstrap';

import { SearchBar, I, Input } from './ModalIndicators.styles';

/**
 * This component is used for rendering the indicators
 * which contains moving average and likely other indicators
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

const indicatorsOptions = [
  { id: 1, name: 'Moving Average', func: ma, sym: 'MA' },
  { id: 2, name: 'Dynamic Moving Average', func: dma, sym: 'DMA' },
  { id: 3, name: 'Exponential Moving Average', func: ema, sym: 'EMA' },
  { id: 4, name: 'Smoothed Moving Average', func: sma, sym: 'SMA' },
  { id: 5, name: 'Weighted Moving Average', func: wma, sym: 'WMA' },
];

function ModalIndicators({ setSelectedIndicators }) {
  /**
   * indicators : list of indicators available for the user to select and
   * plot for the variable of their choice
   * show : boolean value to show the indicator list
   * handleShow : function to show the list of indicators in the top menu
   * handleClose : function to close the list of indicators in the top menu
   * after the user selects the indicator
   * handleChange : function to display the names of available indicators in lowercase
   * handleSelectIndicator : function to record the indicator chosen by the user
   * to plot and render in the app
   */
  const [indicators, setIndicators] = useState(indicatorsOptions);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleChange = ({ target: { value } }) => {
    const tempArr = indicatorsOptions.filter(
      (item) =>
        value === '' || item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setIndicators(tempArr);
  };

  const handleSelectIndicator = (indicator) => {
    // console.log('indicator', indicator);
    setSelectedIndicators(indicator);
    handleClose();
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={handleShow}>
        Indicators
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="bg-dark text-white" data-testid="search-modal">
          <ModalHeader closeButton closeVariant="white">
            <Modal.Title>Indicator Search</Modal.Title>
          </ModalHeader>

          <SearchBar>
            <I className="fa fa-search" aria-hidden="true" />
            <Input
              data-testid="seacrh-input-2"
              type="input"
              placeholder="Search"
              onChange={handleChange}
            />
          </SearchBar>
          <Modal.Body>
            <ListGroup variant="flush" style={{ minHeight: 200 }}>
              {(indicators || []).map((item) => (
                <ListGroup.Item
                  variant="dark"
                  key={item.name}
                  action
                  onClick={() => handleSelectIndicator(item)}
                  style={{
                    background: 'unset',
                    color: 'white',
                    borderBottom: 'solid .5px #80808087',
                  }}
                >
                  {item.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
}

export default ModalIndicators;

ModalIndicators.propTypes = {
  setSelectedIndicators: PropTypes.func.isRequired,
};
