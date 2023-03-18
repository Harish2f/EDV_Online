import React, { useEffect, useReducer } from 'react';
import { Button, Form } from 'react-bootstrap';

import color from '../../constants/colors.json';
import data1 from '../../constants/data.json';
import {
  filterChart,
  getChartWithIndicators,
  getFilteredData,
  getProperDateFormat,
  prepareData,
} from '../../helpers';
import AppToast from '../AppToast/AppToast';
import IndicatorConfiguration from '../IndicatorConfiguration/IndicatorConfiguration';
import Configuration from '../Legends/Legends';
// import Indicators from '../Indicators/Indicators';
import LineChart from '../LineChart/LineChart';
import NavBar from '../ModalSearch/ModalSearch';
import {
  ChartContainer,
  Container,
  MainChartContainer,
  LegendContainer,
} from './LegendsConfiguration.styles';

/**
 *  use a reducer to update legendIndicators
 *  legendIndicators : a legend indicator object with legend name as key, legend indicator as value
 *  action: actions to modify legend indicators
 */
const legendIndicatorReducer = (legendIndicators, action) => {
  const { type, legends, indicator, removeLegend, indicators, variable } =
    action;
  let newLegendIndicators = {};

  switch (type) {
    case 'ensureIndicator':
      legends.forEach((legend) => {
        newLegendIndicators[legend.name] =
          legendIndicators[legend.name] || indicators;
      });
      return newLegendIndicators;
    case 'addIndicator':
      legends.forEach((legend) => {
        const existingIndicators = legendIndicators[legend.name];
        if (existingIndicators) {
          if (
            existingIndicators.findIndex(
              (existingIndicator) => existingIndicator.id === indicator.id,
            ) === -1
          ) {
            newLegendIndicators[legend.name] = [
              ...existingIndicators,
              indicator,
            ];
          } else {
            newLegendIndicators[legend.name] = existingIndicators;
          }
        }
      });
      return newLegendIndicators;
    case 'addIndicatorForVariable':
      newLegendIndicators = { ...legendIndicators };
      newLegendIndicators[variable.name] = [
        ...newLegendIndicators[variable.name],
        indicator,
      ];

      return newLegendIndicators;
    case 'removeIndicator':
      newLegendIndicators = { ...legendIndicators };

      newLegendIndicators[removeLegend.name] = legendIndicators[
        removeLegend.name
      ].filter((existingIndicator) => indicator.id !== existingIndicator.id);

      return newLegendIndicators;
    case 'clearIndicators':
      return {};
    default:
      return legendIndicators;
  }
};

/**
 * This component renders the legends and the functions
 * associated with it to display legends of the variables selected
 * and other child functions like close, displaying units etc.,
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 */

function LegendsConfiguration() {
  /**
   * Displays legend for the variables selected from ModalSearch along with the units and close button to remove variables from graph as per the user's discretion
   *
   * showToast* : boolean value to show the toast message
   * legends : function to display the legends of variable selected from ModalSearch
   * indicators : function to display the legends of indicators
   * selected from IndicatorConfiguration under legends
   * chartData : array of object containing name, color, pane number of a chart and items
   * array holding timestamp and value
   * showIndicatorModal : function to display edit option for the indicator length
   */
  const [showToast, setShowToast] = React.useState(false);
  const [legends, setLegends] = React.useState([]);
  const [indicators, setIndicators] = React.useState([]);
  const [time, setTime] = React.useState(0);
  const [maxTimestamp, setMaxTimestamp] = React.useState(0);
  const [getNewData, setNewData] = React.useState([]);
  const [selectedItemModal, setSelectedModal] = React.useState([]);
  const [chartData1, setChartData] = React.useState([]);
  const [getLoader, setLoader] = React.useState(0);
  const [showIndicatorModal, setshowIndicatorModal] = React.useState(false);
  const [maLen, setMaLen] = React.useState(5);
  const [value, setValue] = React.useState(5);
  const [legendIndicators, legendIndicatorDispatcher] = useReducer(
    legendIndicatorReducer,
    {},
  );
  const [isAddingIndicatorForVariable, setIsAddingIndicatorForVariable] =
    React.useState(false);
  const [currentAddingIndicatorVariable, setCurrentAddingIndicatorVariable] =
    React.useState(null);

  const handleMaLenCancel = () => {
    setValue(maLen);
    setshowIndicatorModal(false);
  };

  const handleMaxLenOk = () => {
    setMaLen(value);
    setshowIndicatorModal(false);
  };

  useEffect(() => {
    const chartDataNew = [];
    let maxTime = 0;
    Object.keys(data1.data[0]).map((item, index) => {
      if (item === 'timestamp') {
        return '';
      }

      const edv = {
        name: item,
        color: color[index],
        items: data1.data.map((d) => {
          const date = getProperDateFormat(d.timestamp);
          const currTime = new Date(date).getTime();
          maxTime = Math.max(maxTime, currTime);
          return {
            time: currTime,
            value: d[item],
          };
        }),
      };

      chartDataNew.push(edv);
      return '';
    });

    setNewData((g) => [...g, chartDataNew]);
    setMaxTimestamp(maxTime);
    setLoader(1);
  }, []);

  useEffect(() => {
    if (getNewData.length > 0) {
      const data = prepareData(selectedItemModal, getNewData);
      setLegends(data.legend);

      legendIndicatorDispatcher({
        type: 'ensureIndicator',
        legends: data.legend,
        indicators,
      });
    }
  }, [selectedItemModal, getNewData, indicators, maLen]);

  useEffect(() => {
    if (getNewData.length > 0) {
      const data = prepareData(selectedItemModal, getNewData);

      const dataWithIndicators = getChartWithIndicators(
        data.chart,
        legendIndicators,
        maLen,
      );
      setChartData(dataWithIndicators);
    }
  }, [selectedItemModal, legendIndicators, getNewData, maLen]);

  const parsedData = getFilteredData(chartData1, time, maxTimestamp);
  // console.log('parsedData', parsedData);

  const removeChart = (row, col) => {
    setSelectedModal(filterChart(selectedItemModal, row, col));
  };

  // const removeIndicator = (name) => {
  //   console.log('removeIndicator side list wala', name);
  //   setIndicators((ind) => ind.filter((i) => i.name !== name));
  // };

  const removeIndicator = (removeLegend, indicator) => {
    legendIndicatorDispatcher({
      type: 'removeIndicator',
      removeLegend,
      indicator,
    });
  };

  const addIndicator = (indicator) => {
    legendIndicatorDispatcher({ type: 'addIndicator', legends, indicator });

    if (indicators.findIndex((ind) => ind.id === indicator.id) === -1) {
      setIndicators((inds) => [...inds, indicator]);
    }
  };

  const showAddIndicatorForVariableModal = (legend) => {
    setCurrentAddingIndicatorVariable(legend);
    setIsAddingIndicatorForVariable(true);
  };

  const addIndicatorForVariable = (indicator) => {
    legendIndicatorDispatcher({
      type: 'addIndicatorForVariable',
      variable: currentAddingIndicatorVariable,
      indicator,
    });

    setCurrentAddingIndicatorVariable(null);
    setIsAddingIndicatorForVariable(false);
  };

  if (getLoader === 0) {
    return <pre>Loading...</pre>;
  }

  return (
    <Container data-testid="chart-container">
      <AppToast show={showToast} onClose={() => setShowToast(false)} />
      <NavBar
        selectedItemModal={selectedItemModal}
        setSelectedModal={setSelectedModal}
        setTime={setTime}
        setShowToast={setShowToast}
        setSelectedIndicators={addIndicator}
        isAddingIndicatorForVariable={isAddingIndicatorForVariable}
        addIndicatorForVariable={addIndicatorForVariable}
      />
      <MainChartContainer>
        <LegendContainer data-testid="legend" className="rounded p-2 me-3">
          <Configuration
            legends={legends}
            onRemoveChart={removeChart}
            legendIndicators={legendIndicators}
            onRemoveIndicator={removeIndicator}
            setshowIndicatorModal={setshowIndicatorModal}
            showAddIndicatorForVariableModal={showAddIndicatorForVariableModal}
          />
          {/* <Indicators
            indicators={indicators}
            onRemoveIndicator={removeIndicator}
            setshowIndicatorModal={setshowIndicatorModal}
          /> */}
          {legends && indicators.length > 0 && (
            <Button
              variant="danger"
              onClick={() => {
                setIndicators([]);
                legendIndicatorDispatcher({ type: 'clearIndicators' });
              }}
            >
              Clear All Indicators
            </Button>
          )}
        </LegendContainer>
        <ChartContainer className="mb-2">
          <LineChart chartData={parsedData} />
        </ChartContainer>
      </MainChartContainer>
      {/* TODO:// RE-USABLE COMPONENT FOR FUTURE USE */}
      <IndicatorConfiguration
        isShow={showIndicatorModal}
        onHide={() => setshowIndicatorModal(false)}
        title="Moving Average Length"
        handleClose={handleMaLenCancel}
        handleOk={handleMaxLenOk}
      >
        <div className="d-flex align-items-center">
          <Form.Label>Length</Form.Label>
          <Form.Control
            type="number"
            data-testid="ma-input"
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value, 10))}
            className="ms-2 bg-dark text-white"
            placeholder="Enter number"
            color="dark"
          />
        </div>
      </IndicatorConfiguration>
    </Container>
  );
}

export default LegendsConfiguration;
