import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalStatCard } from '../TacticalStatCard';

test('renders the label and value correctly', async () => {
  await render(<TacticalStatCard label="TEST.LABEL" value="12345" />);
  await expect.element(page.getByText('TEST.LABEL')).toBeInTheDocument();
  await expect.element(page.getByText('12345')).toBeInTheDocument();
});

test('renders subtext when provided', async () => {
  await render(<TacticalStatCard label="TEST" value="123" subtext="Sub details" />);
  await expect.element(page.getByText('Sub details')).toBeInTheDocument();
});

test('applies custom className', async () => {
  await render(
    <div data-testid="container">
      <TacticalStatCard label="TEST" value="123" className="custom-test-class" />
    </div>
  );
  const container = page.getByTestId('container');
  await expect.element(container.locator('.custom-test-class')).toBeInTheDocument();
});
