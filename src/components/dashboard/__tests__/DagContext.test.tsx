import { expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DagProvider, useDagContext } from '../DagContext';

const TestComponent = () => {
  const { maxRejectionThreshold } = useDagContext();
  return <div data-testid="threshold">{maxRejectionThreshold}</div>;
};

test('DagProvider provides maxRejectionThreshold', async () => {
  // Mock fetch to prevent the useEffect from crashing or trying to actually load data
  globalThis.fetch = vi.fn<typeof fetch>().mockResolvedValue({
    ok: true,
    json: async () => [],
  } as unknown as Response);

  await render(
    <DagProvider>
      <TestComponent />
    </DagProvider>,
  );

  await expect.element(page.getByTestId('threshold')).toHaveTextContent('3');
});
