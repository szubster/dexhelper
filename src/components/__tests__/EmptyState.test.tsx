import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders correctly', async () => {
    const { container } = await render(<EmptyState label="Test Empty State" />);
    await expect.element(container).toHaveTextContent('Test Empty State');
  });

  it('renders default variant', async () => {
    const { container } = await render(<EmptyState variant="default" label="Default State" />);
    await expect.element(container).toHaveTextContent('Default State');
    await expect.element(container).toHaveTextContent('SYS_STATUS: NOMINAL');
  });

  it('renders warning variant', async () => {
    const { container } = await render(<EmptyState variant="warning" label="Warning State" />);
    await expect.element(container).toHaveTextContent('Warning State');
    await expect.element(container).toHaveTextContent('ERR_CODE: 0x00000404 - ENTITY_NOT_FOUND');
  });

  it('renders with custom icon', async () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    const { container } = await render(<EmptyState label="Icon State" icon={<CustomIcon />} />);
    const iconElement = container.querySelector<HTMLElement>('[data-testid="custom-icon"]');
    expect(iconElement).toBeInTheDocument();
  });
});
