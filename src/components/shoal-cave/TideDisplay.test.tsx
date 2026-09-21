import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { TideDisplay } from './TideDisplay';

test('TideDisplay renders high tide correctly', async () => {
  const screen = await render(<TideDisplay tide="High" hoursUntilNextTide={2} minutesUntilNextTide={30} />);

  expect(screen.getByText('Shoal Cave Tide Status')).toBeInTheDocument();
  expect(screen.getByText('High')).toBeInTheDocument();
  expect(screen.getByText('2h 30m')).toBeInTheDocument();
});

test('TideDisplay renders low tide correctly', async () => {
  const screen = await render(<TideDisplay tide="Low" hoursUntilNextTide={4} minutesUntilNextTide={15} />);

  expect(screen.getByText('Shoal Cave Tide Status')).toBeInTheDocument();
  expect(screen.getByText('Low')).toBeInTheDocument();
  expect(screen.getByText('4h 15m')).toBeInTheDocument();
});
