import { ColorType, createChart, CrosshairMode } from 'custom-pane-charts';
// import { sma } from 'moving-averages';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { getSec } from '../../helpers';
import Chart from './LineChart.styles';

/**
 * This component is used for plotting line chart for the variable selected by the user
 *
 * @version 1.0.0
 * @author Harish Kumar <harish.kumar2@gmail.com>
 *
 *
 */
function LineChart({ chartData }) {
  /**
   * chartData : array of object containing name, color, pane number of a chart and
   * items array holding timestamp and value
   */
  const [showTitle, setShowTitle] = useState(true);
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const resizeObserver = useRef();

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: '#131722' },
        textColor: '#fff',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      leftPriceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        secondsVisible: true,
      },
    });
    // console.log(chartData, 'chartData');
    chartData.forEach((item) => {
      const lineSeries = chart.current.addLineSeries({
        title: showTitle ? item.name : '',
        color: item.color,
        lineWidth: item.lineWidth || 3,
        pane: item.pane,
        priceFormat: {
          minMove: 1,
          precision: 2,
        },
      });

      const parsedItems = item.items.map((i) => ({
        ...i,
        time: getSec(i.time),
      }));
      lineSeries.setData(parsedItems);
    });

    return () => chart.current.remove();
  });

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });
    resizeObserver.current.observe(chartContainerRef.current);
    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <>
      {showTitle ? (
        <FaEye
          onClick={() => setShowTitle(false)}
          style={{
            color: '#ffffff',
            position: 'absolute',
            right: 20,
            fontSize: 20,
            display: chartData.length > 0 ? 'block' : 'none',
            cursor: 'pointer',
          }}
        />
      ) : (
        <FaEyeSlash
          onClick={() => setShowTitle(true)}
          style={{
            color: '#ffffff',
            position: 'absolute',
            right: 20,
            fontSize: 20,
            display: chartData.length > 0 ? 'block' : 'none',
            cursor: 'pointer',
          }}
        />
      )}
      <Chart data-testid="chart" ref={chartContainerRef} height="85vh" />
    </>
  );
}

export default LineChart;

LineChart.propTypes = {
  /**
   * array of object containing name, color,  pane number of a chart and
   * items array holding timestamp and value
   */
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      // title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          timestamp: PropTypes.number,
          value: PropTypes.number,
        }),
      ),
      pane: PropTypes.number.isRequired,
    }),
  ),
};

LineChart.defaultProps = {
  chartData: [],
};
