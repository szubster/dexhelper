import React, { useEffect } from 'react';
import { VersionModal } from './VersionModal';
import { useStore } from '../store';
import { expect, within } from '@storybook/test';

const meta = {
  title: 'Components/VersionModal',
  component: VersionModal,
};

export default meta;

export const Default = {
  render: () => {
    const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);

    useEffect(() => {
      setIsVersionModalOpen(true);
    }, [setIsVersionModalOpen]);

    return <VersionModal />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // Due to portals/Zustand, the modal might render outside the canvas element.
    // We should look at the document body if necessary, but standard Storybook testing uses `within`.
    const canvas = within(document.body);
    const element = await canvas.findByText('Select Game Version');
    await expect(element).toBeInTheDocument();
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
