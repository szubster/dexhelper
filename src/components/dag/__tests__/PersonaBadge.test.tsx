import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PersonaBadge } from '../PersonaBadge';

test('PersonaBadge renders with default styles for unknown persona', async () => {
  await render(<PersonaBadge persona="unknown_persona" />);

  const badge = page.getByTestId('persona-badge');
  await expect.element(badge).toBeInTheDocument();
  await expect.element(badge).toHaveClass('text-zinc-400');

  // check title and text
  await expect.element(page.getByTitle('Persona: unknown_persona')).toBeInTheDocument();
  await expect.element(page.getByText('unknown_persona')).toBeInTheDocument();

  // it should use default human icon
  await expect.element(page.getByTestId('persona-icon-unknown_persona')).toBeInTheDocument();
});

test('PersonaBadge maps known personas to correct styles', async () => {
  await render(<PersonaBadge persona="coder" />);

  const badge = page.getByTestId('persona-badge');
  await expect.element(badge).toBeInTheDocument();
  await expect.element(badge).toHaveClass('text-blue-400');
  await expect.element(page.getByTestId('persona-icon-coder')).toBeInTheDocument();
  await expect.element(page.getByText('coder')).toBeInTheDocument();
});

test('PersonaBadge handles empty persona prop gracefully', async () => {
  await render(<PersonaBadge persona="" />);

  const badge = page.getByTestId('persona-badge');
  await expect.element(badge).toBeInTheDocument();
  await expect.element(badge).toHaveClass('text-zinc-400'); // default config
  await expect.element(page.getByTestId('persona-icon-')).toBeInTheDocument();
});

test('PersonaBadge applies custom className', async () => {
  await render(<PersonaBadge persona="architect" className="test-custom-class" />);

  const badge = page.getByTestId('persona-badge');
  await expect.element(badge).toHaveClass('test-custom-class');
});
