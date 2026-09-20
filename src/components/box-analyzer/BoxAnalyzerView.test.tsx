import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { BoxAnalyzerView } from './BoxAnalyzerView';

describe('BoxAnalyzerView', () => {
  it('renders header and content area', async () => {
    // Reset store
    useStore.setState({ saveData: null });

    void render(<BoxAnalyzerView />);

    await expect.element(page.getByText('Box Analyzer')).toBeVisible();
    await expect.element(page.getByText('SYS.ANALYSIS.CORE')).toBeVisible();
    await expect.element(page.getByText('AWAITING DATA SYNC')).toBeVisible();
  });
});
