import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { BootSequence } from '../BootSequence';

describe('BootSequence', () => {
  it('renders the NO_SIGNAL header', async () => {
    await render(<BootSequence />);
    await expect.element(page.getByText('NO_SIGNAL')).toBeInTheDocument();
  });

  it('renders the telemetry text', async () => {
    await render(<BootSequence />);
    await expect.element(page.getByText(/SYS\.INIT_SEQUENCE/)).toBeInTheDocument();
    await expect.element(page.getByText(/MOUNT_STORAGE/)).toBeInTheDocument();
    await expect.element(page.getByText(/ESTABLISH_UPLINK/)).toBeInTheDocument();
  });

  it('renders the prompt to upload save', async () => {
    await render(<BootSequence />);
    await expect.element(page.getByText(/PLEASE INITIALIZE DATALINK VIA/)).toBeInTheDocument();
  });
});
