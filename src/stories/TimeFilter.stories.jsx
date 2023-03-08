import React, { useState } from 'react';

import TimeFilter from '../components/TimeFilter/TimeFilter';

export default {
  title: 'TimeFilter',
  component: TimeFilter,
};

export function FilterDemo() {
  const [, setTime] = useState(0);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TimeFilter setTime={setTime} />
    </div>
  );
}
