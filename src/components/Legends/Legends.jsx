/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { Button } from 'react-bootstrap';

import data1 from '../../constants/data.json';
import { getUnit, getLegend } from '../../helpers/index';
import { Tag, TagDot } from './Legends.styles';

function Configuration({
  legends,
  onRemoveChart = () => {},
  legendIndicators,
  onRemoveIndicator = () => {},
  setshowIndicatorModal = () => {},
}) {
  return (
    <>
      {legends && legends.length > 0 && (
        <h5 className="mt-4 mb-2 text-white font-weight-bold">Legends</h5>
      )}
      {legends?.map((legend) => {
        const { id, name, row, col, color } = legend;

        return (
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemButton>
                <div className="d-flex align-items-center w-100 my-2 user-select-none">
                  {/* <TagDot {...{ bg: cl }} className="me-2" /> */}
                  {/* <div className="text-white">{getLegend(data1, name)}</div> */}
                  {/* <div className="text-warning ms-1">
                    ({getUnit(data1, name)})
                  </div> */}
                  <Tag
                    key={id}
                    data-testid={name}
                    aria-label="legend"
                    className="p-1 px-2 bg-dark"
                  >
                    <TagDot
                      className="p-1"
                      {...{
                        // bg: '#0dcaf0',
                        bg: color,
                      }}
                    />
                    <div
                      className="text-white"
                      style={{
                        marginRight: 'auto',
                        paddingLeft: '.5rem',
                      }}
                    >
                      {getLegend(data1, name)}
                    </div>
                    <div className="text-warning ms-1">
                      ({getUnit(data1, name)})
                    </div>
                    <Button
                      variant="dark"
                      size="sm"
                      data-testid="remove-chart"
                      onClick={() => onRemoveChart(row, col)}
                      className="px-2 py-0 rounded-circle"
                    >
                      <img
                        src="/image/close.png"
                        alt="close"
                        width={5}
                        height={5}
                        loading="lazy"
                      />
                    </Button>
                  </Tag>
                </div>
              </AccordionItemButton>
              <AccordionItemPanel>
                <div
                  className="d-flex flex-column align-items-center w-100 my-2"
                  style={{
                    marginLeft: '20px',
                    maxWidth: '269px',
                  }}
                >
                  {legendIndicators[name]?.map((indicator) => {
                    const { id: indId, name: indName, sym: indSym } = indicator;
                    return (
                      <Tag
                        key={indName}
                        data-testid={name + indSym}
                        aria-label="indicator"
                        className="mb-2 p-1 px-2 bg-dark"
                      >
                        <TagDot
                          className="p-1"
                          {...{
                            bg: '#ffffff',
                          }}
                        />
                        <div
                          className="text-white"
                          style={{
                            marginRight: 'auto',
                            paddingLeft: '.5rem',
                          }}
                        >
                          {indName}
                        </div>
                        <Button
                          variant="dark"
                          size="sm"
                          data-testid={`settings-${indSym}`}
                          onClick={() => setshowIndicatorModal(true)}
                          className="p-0 mr01 rounded-circle"
                        >
                          <img
                            src="/image/settings.svg"
                            alt="gear"
                            width={20}
                            height={20}
                            loading="lazy"
                          />
                        </Button>
                        <Button
                          variant="dark"
                          size="sm"
                          data-testid={`remove-${name}${indId}`}
                          aria-label="remove-button"
                          onClick={() => onRemoveIndicator(legend, indicator)}
                          className="px-2 py-0 rounded-circle"
                        >
                          <img
                            src="/image/close.png"
                            alt="close"
                            width={5}
                            height={5}
                          />
                        </Button>
                      </Tag>
                    );
                  })}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
    </>
  );
}
Configuration.propTypes = {
  legends: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      row: PropTypes.number.isRequired,
      col: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemoveChart: PropTypes.func.isRequired,
  legendIndicators: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        sym: PropTypes.string.isRequired,
      }),
    ),
  ).isRequired,
  onRemoveIndicator: PropTypes.func.isRequired,
  setshowIndicatorModal: PropTypes.func.isRequired,
};
export default Configuration;
