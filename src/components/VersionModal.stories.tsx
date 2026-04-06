import React, { useEffect } from 'react';
import { VersionModal } from './VersionModal';
import { useStore } from '../store';

const meta = {
  title: 'Components/VersionModal',
  component: VersionModal,
};

export default meta;

export const Default = () => {
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
  
  useEffect(() => {
    setIsVersionModalOpen(true);
  }, [setIsVersionModalOpen]);

  return <VersionModal />;
};
