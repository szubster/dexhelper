import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalCard } from '../TacticalCard';

test('renders TacticalCard with default variant', async () => {
  await render(<TacticalCard>Test Content</TacticalCard>);
  await expect.element(page.getByText('Test Content')).toBeInTheDocument();
});

test('renders with custom props', async () => {
  await render(
    <TacticalCard ariaLabel="test-label" title="test-title" testId="test-id" pokemonId={1} className="custom-class">
      Content
    </TacticalCard>,
  );

  const button = page.getByTestId('test-id');
  await expect.element(button).toHaveAttribute('aria-label', 'test-label');
  await expect.element(button).toHaveAttribute('title', 'test-title');
  await expect.element(button).toHaveAttribute('data-pokemon-id', '1');
});
