import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagProvider, useDagContext } from '../DagContext';

const TestComponent = () => {
  const { maxRejectionThreshold, setActiveView } = useDagContext();
  return (
    <div>
      <div data-testid="threshold">{maxRejectionThreshold}</div>
      <button type="button" data-testid="btn" onClick={() => setActiveView('board')}>
        Set View
      </button>
    </div>
  );
};

test('DagProvider provides maxRejectionThreshold and handles data loading correctly', async () => {
  // Return valid ParsedNode data matching buildDagGraph expectations
  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: true,
    json: async () => [
      {
        filePath: 'node-1.md',
        data: {
          id: 'node-1',
          type: 'TASK',
          status: 'COMPLETED',
          owner_persona: 'human',
          label: 'node',
          title: 'Node 1',
          rejection_count: 0,
          depends_on: [],
        },
      },
    ],
  } as unknown as Response);

  await render(
    <DagProvider>
      <TestComponent />
    </DagProvider>,
  );

  await expect.element(page.getByTestId('threshold')).toHaveTextContent('3');
  await page.getByTestId('btn').click();
});

test('DagProvider handles load error gracefully', async () => {
  const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: false,
  } as unknown as Response);

  await render(
    <DagProvider>
      <TestComponent />
    </DagProvider>,
  );

  await expect.element(page.getByTestId('threshold')).toHaveTextContent('3');
  consoleErrorSpy.mockRestore();
});
