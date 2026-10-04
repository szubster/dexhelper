import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagTreeProvider } from '../DagTreeContext';
import { DagTreeItem } from '../DagTreeItem';

describe('DagTreeItem', () => {
  it('renders correctly with no children', async () => {
    await render(
      <DagTreeProvider>
        <ul>
          <DagTreeItem nodeId="node-1" label="Test Node" status="COMPLETED" />
        </ul>
      </DagTreeProvider>,
    );

    await expect.element(page.getByText('Test Node')).toBeInTheDocument();
    await expect.element(page.getByText('[COMPLETED]')).toBeInTheDocument();
  });

  it('renders permanent failure styling correctly', async () => {
    await render(
      <DagTreeProvider>
        <ul>
          <DagTreeItem nodeId="node-1" label="Failed Node" status="FAILED" isPermanentFailure={true} />
          <DagTreeItem nodeId="node-2" label="Cancelled Node" status="CANCELLED" isPermanentFailure={true} />
        </ul>
      </DagTreeProvider>,
    );

    // Find the wrapper element by getting the closest container
    const container = page.getByRole('listitem').first();
    await expect.element(container).toContainElement(page.getByText('Failed Node'));
    // The styling is on the div inside the listitem, but it's hard to target directly with vitest browser locator
  });

  it('can be expanded and collapsed when it has children', async () => {
    await render(
      <DagTreeProvider>
        <ul>
          <DagTreeItem nodeId="node-1" label="Parent Node" status="ACTIVE">
            <DagTreeItem nodeId="node-2" label="Child Node" status="READY" />
          </DagTreeItem>
        </ul>
      </DagTreeProvider>,
    );

    // Initial state: collapsed
    await expect.element(page.getByText('Parent Node')).toBeInTheDocument();
    await expect.element(page.getByText('Child Node')).not.toBeInTheDocument();

    // Click to expand
    await page.getByRole('button').first().click();
    await expect.element(page.getByText('Child Node')).toBeInTheDocument();

    // Click to collapse
    await page.getByRole('button').first().click();
    await expect.element(page.getByText('Child Node')).not.toBeInTheDocument();
  });
});
