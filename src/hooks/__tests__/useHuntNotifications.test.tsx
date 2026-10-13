import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { useHuntNotifications } from '../useHuntNotifications';

const TestComponent = ({ onNotify }: { onNotify: (itemIds: number[]) => void }) => {
  useHuntNotifications(onNotify);
  return null;
};

describe('useHuntNotifications', () => {
  beforeEach(() => {
    const store = useStore.getState();
    store.clearNewlyAcquiredWildItemIds();
    store.clearSelectedWildItemIds();
    vi.clearAllMocks();
  });

  it('should trigger onNotify when newlyAcquiredWildItemIds is populated', async () => {
    const onNotify = vi.fn<(itemIds: number[]) => void>();
    await render(<TestComponent onNotify={onNotify} />);

    useStore.getState().addNewlyAcquiredWildItemId(1);

    // allow state updates to settle
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(onNotify).toHaveBeenCalledWith([1]);
    expect(useStore.getState().newlyAcquiredWildItemIds).toEqual([]); // Assert cleared
  });

  it('should not trigger onNotify if newlyAcquiredWildItemIds is empty', async () => {
    const onNotify = vi.fn<(itemIds: number[]) => void>();
    await render(<TestComponent onNotify={onNotify} />);

    expect(onNotify).not.toHaveBeenCalled();
  });
});
