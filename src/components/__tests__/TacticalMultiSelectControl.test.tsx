import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TacticalMultiSelectControl } from '../TacticalMultiSelectControl';

describe('TacticalMultiSelectControl', () => {
  const mockItems = [
    { id: '1', label: 'Item 1', isActive: false, onClick: vi.fn<() => void>() },
    { id: '2', label: 'Item 2', isActive: true, onClick: vi.fn<() => void>() },
  ];

  it('renders correctly', () => {
    render(<TacticalMultiSelectControl items={mockItems} ariaLabel="Test Control" />);

    const item1 = screen.getByText('Item 1');
    const item2 = screen.getByText('Item 2');

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    expect(item1).toHaveAttribute('aria-pressed', 'false');
    expect(item2).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onClick when an item is clicked', () => {
    render(<TacticalMultiSelectControl items={mockItems} ariaLabel="Test Control" />);

    const item1 = screen.getByText('Item 1');
    fireEvent.click(item1);

    expect(mockItems[0]?.onClick).toHaveBeenCalledTimes(1);
  });
});
