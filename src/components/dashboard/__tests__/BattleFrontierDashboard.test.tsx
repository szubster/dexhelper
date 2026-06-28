import { render, screen } from '@testing-library/react';
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
  it('renders BP wallet and facility nodes', () => {
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

    render(<BattleFrontierDashboard progress={mockProgress} />);

    expect(screen.getByText(/BP WALLET:/)).toBeInTheDocument();
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('BATTLE TOWER')).toBeInTheDocument();
  });
});
