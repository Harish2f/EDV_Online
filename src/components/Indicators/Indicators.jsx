import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { Button } from 'react-bootstrap';

import randomColor from '../../utils/randomColor';
import { Tag, TagDot } from '../Legends/Legends.styles';

function Indicators({
  indicators,
  onRemoveIndicator = () => {},
  setshowIndicatorModal = () => {},
}) {
  return (
    <div>
      {indicators.length > 0 && (
        <h5 className="mt-4 mb-2 text-white font-weight-bold">Indicators</h5>
      )}
      {indicators.map(({ name, sym }) => {
        return (
          <Accordion allowZeroExpanded key={sym}>
            <AccordionItem>
              <AccordionItemButton>
                <div className="d-flex align-items-center w-100 my-2 user-select-none">
                  <TagDot
                    className="me-2"
                    {...{
                      bg: randomColor,
                    }}
                  />
                  <div className="text-black">{name}</div>
                </div>
              </AccordionItemButton>
              <AccordionItemPanel>
                <div className="d-flex align-items-center w-100 my-2">
                  <Tag
                    key={name}
                    data-testid={sym}
                    className="me-3  mb-2 p-1 px-2 bg-dark"
                  >
                    <TagDot
                      className="p-1"
                      {...{
                        bg: randomColor,
                      }}
                    />
                    <div
                      className="text-white"
                      style={{
                        marginRight: 'auto',
                        paddingLeft: '.5rem',
                      }}
                    >
                      {name}
                    </div>
                    <Button
                      variant="dark"
                      size="sm"
                      data-testid={`settings-${sym}`}
                      onClick={() => setshowIndicatorModal(true)}
                      className="p-0 mr-1 rounded-circle"
                    >
                      <img
                        src="/image/settings.svg"
                        alt="gear"
                        width={20}
                        height={20}
                      />
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      data-testid={`remove-${sym}`}
                      onClick={() => onRemoveIndicator(name)}
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
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
}

Indicators.propTypes = {
  indicators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sym: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onRemoveIndicator: PropTypes.func.isRequired,
  setshowIndicatorModal: PropTypes.func.isRequired,
};
export default Indicators;
