import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'react-bootstrap';

/**
 * This component return a Modal where the Indicators will be listed for use
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

function IndicatorConfiguration({
  /**
   * Displays a modal where the available
   * indicators will be shown for the user to select
   *
   * isShow : boolean value to show the Indicator Modal
   * children : list of available indicators
   * onHide : boolean value to check if the modal has to be hidden
   * handleOk : function to select the indicator from the list available
   * handleClose	: function to close the modal function
   * title : function to display title of the Modal
   */
  isShow = false,
  children,
  onHide,
  handleOk,
  handleClose,
  title,
}) {
  const okButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        // Check if enter key was pressed
        event.preventDefault();
        okButtonRef.current.click(); // Trigger click event on "Ok" button
      }
    };

    if (isShow) {
      document.addEventListener('keydown', handleKeyDown); // Add keydown event listener
    } else {
      document.removeEventListener('keydown', handleKeyDown); // Remove keydown event listener
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Cleanup function to remove event listener
    };
  }, [isShow]);

  const handleDone = () => {
    handleOk();
    handleClose();
  };
  return (
    <Modal show={isShow} onHide={onHide}>
      <div className="bg-dark text-white" data-testid="search-modal">
        <ModalHeader closeButton closeVariant="white">
          <Modal.Title>{title}</Modal.Title>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="outline-light" onClick={handleClose}>
            Cancel
          </Button>
          <Button ref={okButtonRef} variant="light" onClick={handleDone}>
            Ok
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
}

IndicatorConfiguration.propTypes = {
  isShow: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onHide: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
export default IndicatorConfiguration;
