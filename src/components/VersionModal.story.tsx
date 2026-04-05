import React, { useEffect } from 'react';
import { VersionModal } from './VersionModal';
import { useStore } from '../store';

export function VersionModalStory() {
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
  
  useEffect(() => {
    setIsVersionModalOpen(true);
  }, [setIsVersionModalOpen]);

  return <VersionModal />;
}
