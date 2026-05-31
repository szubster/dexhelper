import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { DiagnosticCard } from '../DiagnosticCard';

test('DiagnosticCard renders correctly with all props', async () => {
  await render(<DiagnosticCard label="SYS.VER" value="Red" subValue="Gen: 1" valueClassName="uppercase" />);

  await expect.element(page.getByText('SYS.VER')).toBeInTheDocument();
  await expect.element(page.getByText('Red')).toBeInTheDocument();
  await expect.element(page.getByText('Red')).toHaveClass(/uppercase/);
  await expect.element(page.getByText('Gen: 1')).toBeInTheDocument();
});

test('DiagnosticCard renders correctly without subValue', async () => {
  await render(<DiagnosticCard label="SYS.VER" value="Red" />);

  await expect.element(page.getByText('SYS.VER')).toBeInTheDocument();
  await expect.element(page.getByText('Red')).toBeInTheDocument();
});
