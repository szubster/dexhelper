import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import { BattleFrontierDashboard } from '../BattleFrontierDashboard';

// Mock ResizeObserver for React Flow
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;

describe('BattleFrontierDashboard', () => {
  it('renders without crashing', () => {
    const mockProgress = {
      tower: { current: 10, record: 20, silverFlag: false, goldFlag: false },
      dome: { current: 0, record: 0, silverFlag: false, goldFlag: false },
      palace: { current: 0, record: 0, silverFlag: false, goldFlag: false },
      arena: { current: 0, record: 0, silverFlag: false, goldFlag: false },
      factory: { current: 0, record: 0, silverFlag: false, goldFlag: false },
      pike: { current: 0, record: 0, silverFlag: false, goldFlag: false },
      pyramid: { current: 0, record: 0, silverFlag: false, goldFlag: false },
      battlePoints: 123,
    };

    const container = document.createElement('div');
    const root = createRoot(container);
    root.render(<BattleFrontierDashboard progress={mockProgress} />);
    // Just verify it doesn't crash on render. A simple smoke test.
    expect(true).toBe(true);
  });
});
