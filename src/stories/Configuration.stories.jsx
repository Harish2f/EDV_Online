import Configuration from '../components/Legends/Legends';

export default {
  title: 'Configuration',
  component: Configuration,
};

export function ConfigurationDemo() {
  const legends = [
    {
      id: 1,
      name: 'C03_Calc_Notch',
      color: '#36a2eb',
      row: 0,
      col: 0,
    },
    {
      id: 2,
      name: 'C03_Calc_Notch',
      color: '#36a2eb',
      row: 0,
      col: 1,
    },
  ];

  const legendIndicators = {
    C03_Calc_Notch: [],
  };
  return (
    <Configuration
      legends={legends}
      legendIndicators={legendIndicators}
      onRemoveChart={() => {}}
    />
  );
}
