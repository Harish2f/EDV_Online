import { useState } from 'react';

import IndicatorConfiguration from '../components/IndicatorConfiguration/IndicatorConfiguration';

export default {
  title: 'Indicator Configuration',
  component: IndicatorConfiguration,
};

export function IndicatorConfigurationDemo() {
  const [, setTime] = useState(0);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <IndicatorConfiguration
        isShow
        onHide={() => setTime((time) => time + 1)}
        handleOk={() => setTime((time) => time + 1)}
        handleClose={() => setTime((time) => time + 1)}
        title="Show Modal"
      >
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
      </IndicatorConfiguration>
    </div>
  );
}
