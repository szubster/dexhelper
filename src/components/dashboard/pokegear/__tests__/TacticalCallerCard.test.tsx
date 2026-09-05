import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Contact } from '../../../../engine/saveParser/parsers/gen2/phone/predictor';
import { TacticalCallerCard } from '../TacticalCallerCard';

const mockContact: Contact = { id: 17, name: 'Fisher Ralph' };

test('renders correctly for SWARM variant with ADR 008 aesthetic classes', async () => {
  const { container } = await render(
    <TacticalCallerCard contact={mockContact} type="SWARM" details="Qwilfish" probability={50} />,
  );

  await expect.element(page.getByText('Fisher Ralph')).toBeInTheDocument();
  await expect.element(page.getByText('[ TARGET_LOCK ]')).toBeInTheDocument();
  await expect.element(page.getByText('PROB: 50%')).toBeInTheDocument();
  await expect.element(page.getByText('[ SWARM ]')).toBeInTheDocument();
  await expect.element(page.getByText('Qwilfish')).toBeInTheDocument();

  // Check ADR 008 aesthetic classes
  expect(container.innerHTML).toContain('tactical-text');
  expect(container.innerHTML).toContain('border-dashed');
  expect(container.innerHTML).toContain('tactical-text');
  expect(container.innerHTML).toContain('rounded-none');
});

test('renders correctly for ITEM variant', async () => {
  const itemContact: Contact = { id: 24, name: 'Schoolboy Alan' };
  await render(<TacticalCallerCard contact={itemContact} type="ITEM" details="Fire Stone" probability={0} />);

  await expect.element(page.getByText('Schoolboy Alan')).toBeInTheDocument();
  await expect.element(page.getByText('PROB: 0%')).toBeInTheDocument();
  await expect.element(page.getByText('[ ITEM ]')).toBeInTheDocument();
  await expect.element(page.getByText('Fire Stone')).toBeInTheDocument();
});

test('renders correctly for STANDARD variant with no details', async () => {
  const standardContact: Contact = { id: 1, name: 'Mom' };
  await render(<TacticalCallerCard contact={standardContact} type="NONE" probability={15} />);

  await expect.element(page.getByText('Mom')).toBeInTheDocument();
  await expect.element(page.getByText('PROB: 15%')).toBeInTheDocument();
  // Ensure badge for SWARM/ITEM is not rendered
  const swarmElements = page.getByText('[ SWARM ]').elements();
  expect(swarmElements.length).toBe(0);
  const itemElements = page.getByText('[ ITEM ]').elements();
  expect(itemElements.length).toBe(0);
});
