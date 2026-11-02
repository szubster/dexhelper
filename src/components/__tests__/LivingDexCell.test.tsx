import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { LivingDexCell } from '../LivingDexCell';

const createMockRouter = (component: React.ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => component,
  });
  const routeTree = rootRoute.addChildren([
    createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => component,
    }),
  ]);
  const history = createMemoryHistory();
  return createRouter({ routeTree, history });
};

describe('LivingDexCell', () => {
  afterEach(async () => {
    await cleanup();
  });

  test('renders ghost slot correctly with tactical styling', async () => {
    const router = createMockRouter(<LivingDexCell id={1} inParty={false} inPC={false} isShiny={false} />);
    await render(<RouterProvider router={router} />);

    const card = page.getByTestId('pokedex-card');

    // Ghost slot specific rendering
    await expect.element(page.getByText('GHOST')).toBeInTheDocument();

    const numberSpan = page.getByText('001', { exact: true });
    await expect.element(numberSpan).toHaveClass('opacity-30');
    await expect.element(numberSpan).toHaveClass('grayscale');
    await expect.element(numberSpan).toHaveClass('text-zinc-600');

    // Ghost slot styling on the card (not secured)
    await expect.element(card).toHaveClass('bg-black/40');
    await expect.element(card).toHaveClass('border-zinc-800');

    // Tactical aesthetics styling
    await expect.element(card).toHaveClass('tactical-card');
    await expect.element(card).toHaveClass('border-dashed');
    await expect.element(card).toHaveClass('rounded-none');
  });

  test('renders secured pokemon correctly with tactical styling', async () => {
    const router = createMockRouter(
      // inParty or inPC triggers isSecured!
      <LivingDexCell id={2} inParty={true} inPC={false} isShiny={false} />,
    );
    await render(<RouterProvider router={router} />);

    const card = page.getByTestId('pokedex-card');

    await expect.element(card).toHaveClass('border-cyan-500/50');
    await expect.element(card).toHaveClass('bg-cyan-950/20');

    // Number is cyan
    await expect.element(page.getByText('002', { exact: true })).toHaveClass('text-cyan-400');
  });

  test('renders shiny indicator when isShiny is true', async () => {
    const router = createMockRouter(<LivingDexCell id={3} inParty={true} inPC={false} isShiny={true} />);
    const screen = await render(<RouterProvider router={router} />);

    // Test the element by querying the underlying DOM node to ensure it exists
    const container = screen.container;
    const shinyElement = container.querySelector('.text-amber-400');
    expect(shinyElement).not.toBeNull();
  });

  test('renders party and PC indicators when inParty and inPC are true', async () => {
    const router = createMockRouter(<LivingDexCell id={4} inParty={true} inPC={true} isShiny={false} />);
    const screen = await render(<RouterProvider router={router} />);

    const container = screen.container;
    const partyIndicator = container.querySelector('.text-rose-500');
    expect(partyIndicator).not.toBeNull();

    const pcIndicator = container.querySelector('.text-cyan-400');
    expect(pcIndicator).not.toBeNull();
  });
});
