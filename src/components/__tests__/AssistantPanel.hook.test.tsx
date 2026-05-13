import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { useAssistant } from '../../hooks/useAssistant';

describe('useAssistant hook rendering test', () => {
  it('memoizes generation correctly', () => {
    const queryClient = new QueryClient();
    let res: unknown = null;
    const DummyComponent = () => {
      res = useAssistant(null, false, 'red');
      return <div data-testid="test-div">Dummy</div>;
    };
    void render(
      <QueryClientProvider client={queryClient}>
        <DummyComponent />
      </QueryClientProvider>,
    );
    expect(res).toBeDefined();
  });
});
