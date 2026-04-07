import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import { VersionModal } from './VersionModal';
import { useStore } from '../store';

const meta: Meta<typeof VersionModal> = {
  title: 'Components/VersionModal',
  component: VersionModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VersionModal>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
      useEffect(() => {
        setIsVersionModalOpen(true);
      }, [setIsVersionModalOpen]);
      return <Story />;
    },
  ],
};
