import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagKanbanBoard } from '../DagKanbanBoard';

const mockUseDagContext = vi.fn<() => Record<string, unknown>>();

vi.mock('../../DagContext', () => ({
  useDagContext: () => mockUseDagContext(),
}));

test('DagKanbanBoard renders permanently failed nodes correctly', async () => {
  mockUseDagContext.mockReturnValue({
    maxRejectionThreshold: 3,
    nodes: [
      { data: { id: 'node-1', status: 'FAILED', type: 'TASK', owner_persona: 'coder', rejection_count: 3 } },
      { data: { id: 'node-2', status: 'FAILED', type: 'TASK', owner_persona: 'coder', rejection_count: 1 } },
      { data: { id: 'node-3', status: 'COMPLETED', type: 'TASK', owner_persona: 'coder', rejection_count: 0 } },
    ],
  });

  await render(<DagKanbanBoard />);

  await expect.element(page.getByText('node-1')).toBeInTheDocument();
  await expect.element(page.getByText('[ PERMANENTLY FAILED ]')).toBeInTheDocument();
  await expect.element(page.getByText('node-2')).toBeInTheDocument();
  await expect.element(page.getByText('node-3')).toBeInTheDocument();
});
