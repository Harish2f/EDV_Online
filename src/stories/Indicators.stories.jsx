import Indicators from '../components/Indicators/Indicators';

export default {
  title: 'Indicators',
  component: Indicators,
};

export function IndicatorsDemo() {
  const indicators = [
    {
      name: 'C03_Calc_Notch',
      sym: 'C03',
    },
    {
      name: 'C03_Calc_Notch',
      sym: 'C03',
    },
  ];
  return (
    <Indicators
      indicators={indicators}
      onRemoveIndicator={() => {}}
      setshowIndicatorModal={() => {}}
    />
  );
}
