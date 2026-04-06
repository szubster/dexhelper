import { useEffect } from 'react';
import { useStore } from '../store';
import { VersionModal } from './VersionModal';

export function VersionModalStory() {
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);

  useEffect(() => {
    setIsVersionModalOpen(true);
  }, [setIsVersionModalOpen]);

  return <VersionModal />;
}
