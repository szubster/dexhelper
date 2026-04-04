import { createComponent } from '@lit/react';
import React from 'react';
import { VersionModal as LitVersionModal } from './lit/version-modal';
import { useStore } from '../store';
import type { GameVersion } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';

// Create the React wrapper for the Lit component
export const VersionModalWrapper = createComponent({
  tagName: 'lit-version-modal',
  elementClass: LitVersionModal,
  react: React,
  events: {
    onVersionSelect: 'version-select',
  },
});

export function VersionModal() {
  const isVersionModalOpen = useStore((s) => s.isVersionModalOpen);
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const saveData = useStore((s) => s.saveData);

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const versions = genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions];

  const handleVersionSelect = (e: Event) => {
    const customEvent = e as CustomEvent<{ versionId: string }>;
    setManualVersion(customEvent.detail.versionId as GameVersion);
    setIsVersionModalOpen(false);
  };

  return (
    <VersionModalWrapper
      isOpen={isVersionModalOpen}
      versions={versions}
      onVersionSelect={handleVersionSelect}
    />
  );
}
