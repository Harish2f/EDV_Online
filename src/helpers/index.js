export const getSec = (miliSec) => {
  return miliSec / 1000;
};

export const getFilteredData = (data, time, maxTimestamp) => {
  const chart = [];
  let pane = 0;
  data.forEach((graphs) => {
    graphs.forEach((graph) => {
      const points = graph?.items?.filter((g) => {
        return time === 0 || getSec(maxTimestamp - g.time) <= time;
      });
      // console.log(data, 'getFilteredData');
      if (points && points.length > 0) {
        chart.push({ ...graph, items: points, pane });
      }
    });
    pane += 1;
  });

  return chart;
};

export const getLegend = (data, key) => {
  if (!data.metadata[key]) {
    return key;
  }
  return data.metadata[key].name;
};

export const getUnit = (data, key) => {
  if (data.metadata[key]) {
    return data.metadata[key].unit;
  }
  return '';
};

export const prepareData = (selectedItemModal, getNewData) => {
  const data = [];
  const pickedLegends = [];
  let id = 0;
  let row = 0;
  selectedItemModal.forEach((item) => {
    const graphs = [];
    let col = 0;
    item.forEach((name) => {
      const graph = getNewData[0].find(
        (d) => d.name.toLowerCase() === name.toLowerCase(),
      );
      graphs.push(graph);
      pickedLegends.push({
        name: graph?.name,
        color: graph?.color,
        id,
        row,
        col,
      });
      id += 1;
      col += 1;
    });
    row += 1;
    data.push(graphs);
  });

  return { chart: data, legend: pickedLegends };
};

export const filterChart = (chart, r, c) => {
  let newChart = [...chart];
  newChart[r] = chart[r].filter((ch, index) => index !== c);
  if (newChart[r].length === 0) {
    newChart = newChart.filter((ch, index) => index !== r);
  }
  return newChart;
};

export const getChartWithIndicators = (chart, legendIndicators, len = 5) => {
  // console.log('getChartWithIndicators', chart);
  const items = [...chart];
  // console.log(items, 'items');
  if (items.length > 0) {
    items.forEach((mainItems, itemIndex) => {
      mainItems.forEach((mainItem) => {
        const indicators = legendIndicators[mainItem.name];

        if (indicators) {
          indicators.forEach((indicator, indicatorIndex) => {
            const indicatorItem = {
              color: 'white',
              id: indicatorIndex,
              name: `${mainItem.name} ${indicator.sym}`,
              lineWidth: 1,
              items: indicator
                .func(
                  mainItem.items.map((x) => parseInt(x.value, 10)),
                  len,
                )
                .map((value, itemsIndex) => ({
                  value,
                  time: mainItem.items[itemsIndex].time,
                })),
              pane: 0,
              indicator: true,
            };
            items[itemIndex] = [...items[itemIndex], indicatorItem];
          });
        }
      });
    });
  }
  return items;
};

export const getGroupName = (symbol) => {
  if (symbol.includes('.')) {
    return symbol.substring(0, symbol.indexOf('.'));
  }
  if (symbol.includes('_')) {
    return symbol.substring(0, symbol.indexOf('_'));
  }
  if (symbol.includes(' ')) {
    return symbol.substring(0, symbol.indexOf(' '));
  }

  return symbol;
};

export const getProperDateFormat = (str) => {
  const main = str.split(' ');
  const date = main[1].split('/');
  return `${main[0]} ${date[1]}/${date[0]}/${date[2]}`;
};
