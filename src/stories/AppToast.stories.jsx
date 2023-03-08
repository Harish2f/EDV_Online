import { useState } from 'react';
import { Button } from 'react-bootstrap';

import AppToast from '../components/AppToast/AppToast';

export default {
  title: 'AppToast',
  component: AppToast,
};

export function AppToastDemo() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {!show && <Button onClick={() => setShow(true)}>Show Toast</Button>}
      <AppToast show={show} onClose={() => setShow(false)} />
    </div>
  );
}
