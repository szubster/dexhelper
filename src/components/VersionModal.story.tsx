import React, { useEffect } from 'react';
import { VersionModal } from './VersionModal';
import { useStore } from '@nanostores/react';
import * as Store from '../store';

export function VersionModalStory() {
  const setIsVersionModalOpen = Store.setIsVersionModalOpen;
  
  useEffect(() => {
    setIsVersionModalOpen(true);
  }, [setIsVersionModalOpen]);

  return <VersionModal />;
}
