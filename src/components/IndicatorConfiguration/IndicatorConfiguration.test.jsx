import { screen, render, fireEvent } from '@testing-library/react';

import IndicatorConfiguration from './IndicatorConfiguration';

describe('indicatorConfiguration', () => {
  it('should render the component', () => {
    const onHide = jest.fn();
    const handleOk = jest.fn();
    const handleClose = jest.fn();
    const title = 'Indicator Configuration';
    const children = <p>This is the modal body</p>;
    render(
      <IndicatorConfiguration
        isShow
        onHide={onHide}
        handleOk={handleOk}
        handleClose={handleClose}
        title={title}
      >
        {children}
      </IndicatorConfiguration>,
    );
    expect(screen.getByTestId('search-modal')).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Ok')).toBeInTheDocument();
  });

  it('should call handleClose when clicking on Cancel', () => {
    const onHide = jest.fn();
    const handleOk = jest.fn();
    const handleClose = jest.fn();
    const title = 'Indicator Configuration';
    const children = <p>This is the modal body</p>;
    render(
      <IndicatorConfiguration
        isShow
        onHide={onHide}
        handleOk={handleOk}
        handleClose={handleClose}
        title={title}
      >
        {children}
      </IndicatorConfiguration>,
    );
    fireEvent.click(screen.getByText('Cancel'));
    // eslint-disable-next-line jest/prefer-called-with
    expect(handleClose).toHaveBeenCalled();
  });

  it('should call handleOk when clicking on Ok', () => {
    const onHide = jest.fn();
    const handleOk = jest.fn();
    const handleClose = jest.fn();
    const title = 'Indicator Configuration';
    const children = <p>This is the modal body</p>;
    render(
      <IndicatorConfiguration
        isShow
        onHide={onHide}
        handleOk={handleOk}
        handleClose={handleClose}
        title={title}
      >
        {children}
      </IndicatorConfiguration>,
    );
    fireEvent.click(screen.getByText('Ok'));
    // eslint-disable-next-line jest/prefer-called-with
    expect(handleOk).toHaveBeenCalled();
  });
});
