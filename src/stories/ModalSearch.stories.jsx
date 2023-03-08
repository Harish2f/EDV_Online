import React, { useState } from 'react';

import ModalSearch from '../components/ModalSearch/ModalSearch';

export default {
  title: 'ModalSearch',
  component: ModalSearch,
};

export function NavBarDemo() {
  const [, setTime] = useState(0);
  const [selectedItemModal, setSelectedItemModal] = useState([]);
  const [, setShowToast] = useState(false);
  return (
    <ModalSearch
      setTime={setTime}
      setShowToast={setShowToast}
      selectedItemModal={selectedItemModal}
      setSelectedModal={setSelectedItemModal}
    />
  );
}
