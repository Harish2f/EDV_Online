import PropTypes from 'prop-types';
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

/**
 * This component return a toast componet to notify user about
 * reaching limit for comparing graph
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */
function AppToast({ show, onClose }) {
  /**
   * Displays a message when more than 3 variables
   * are selected to plot in 'New Pane' option
   *
   * show* : boolean value to show the toast bool
   * onClose*	: function to close the toast function
   */
  return (
    <ToastContainer className="p-3" position="bottom-center">
      <Toast bg="dark" show={show} onClose={onClose} delay={5000} autohide>
        <Toast.Header
          className="bg-dark"
          closeVariant="white"
          data-testid="toast-header"
        >
          <span className="me-auto text-white">
            Can{`'`}t compare more than 3 variables!
          </span>
        </Toast.Header>
      </Toast>
    </ToastContainer>
  );
}

export default AppToast;

AppToast.propTypes = {
  /**
   * boolean value to show the toast
   */
  show: PropTypes.bool.isRequired,
  /**
   * function to close the toast
   */
  onClose: PropTypes.func.isRequired,
};
