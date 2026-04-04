import React from 'react';
import { AssistantPanel } from './AssistantPanel';
import { useStore } from '@nanostores/react';
import * as Store from '../store';
import { ReactQueryProvider } from './ReactQueryProvider';

export function AssistantView() {
  const saveData = useStore(Store.saveData);
  const $settings = useStore(Store.settings);
  const { isLivingDex, manualVersion } = $settings;

  if (!saveData) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <AssistantPanel saveData={saveData} isLivingDex={isLivingDex} manualVersion={manualVersion} />
    </ReactQueryProvider>
  );
}
