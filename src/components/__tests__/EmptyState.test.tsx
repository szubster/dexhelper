import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders correctly', async () => {
    await render(<EmptyState label="Test Empty State" />);
    await expect.element(page.getByText('Test Empty State')).toBeInTheDocument();
  });

  it('renders default variant', async () => {
    await render(<EmptyState variant="default" label="Default State" />);
    await expect.element(page.getByText('Default State')).toBeInTheDocument();
    await expect.element(page.getByText('DATA_STREAM_EMPTY')).toBeInTheDocument();
  });

  it('renders warning variant', async () => {
    await render(<EmptyState variant="warning" label="Warning State" />);
    await expect.element(page.getByText('Warning State')).toBeInTheDocument();
    await expect.element(page.getByText('SIGNAL_LOST')).toBeInTheDocument();
  });

  it('renders with custom icon', async () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    const { container } = await render(<EmptyState label="Icon State" icon={<CustomIcon />} />);
    const iconElement = container.querySelector<HTMLElement>('[data-testid="custom-icon"]');
    expect(iconElement).toBeInTheDocument();
  });
});
