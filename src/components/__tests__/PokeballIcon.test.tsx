import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { PokeballIcon } from '../PokeballIcon';

describe('PokeballIcon', () => {
  it('renders default small size and red color for poke ball', async () => {
    const { container } = await render(<PokeballIcon type="poke" data-testid="ball" />);
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball).not.toBeNull();
    expect(ball?.className).toContain('h-4');
    expect(ball?.className).toContain('w-4');
    expect(ball?.className).toContain('border-red-500');
    expect(ball?.className).toContain('bg-red-500/20');
  });

  it('renders emerald color for safari ball', async () => {
    const { container } = await render(<PokeballIcon type="safari" data-testid="ball" />);
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball?.className).toContain('border-emerald-500');
    expect(ball?.className).toContain('bg-emerald-500/20');
  });

  it('renders yellow color for ultra ball', async () => {
    const { container } = await render(<PokeballIcon type="ultra" data-testid="ball" />);
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball?.className).toContain('border-yellow-500');
    expect(ball?.className).toContain('bg-yellow-500/20');
  });

  it('renders blue color for great ball', async () => {
    const { container } = await render(<PokeballIcon type="great" data-testid="ball" />);
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball?.className).toContain('border-blue-500');
    expect(ball?.className).toContain('bg-blue-500/20');
  });

  it('renders pink color for love ball', async () => {
    const { container } = await render(<PokeballIcon type="love" data-testid="ball" />);
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball?.className).toContain('border-pink-500');
    expect(ball?.className).toContain('bg-pink-500/20');
  });

  it('renders medium size and glow effect when specified', async () => {
    const { container } = await render(<PokeballIcon type="ultra" size="md" glow data-testid="ball" />);
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball?.className).toContain('h-6');
    expect(ball?.className).toContain('w-6');
    expect(ball?.className).toContain('shadow-[0_0_10px_rgba(234,179,8,0.5)]');
  });

  it('accepts custom className and forwards extra props', async () => {
    const { container } = await render(
      <PokeballIcon type="poke" className="custom-class" data-testid="ball" aria-label="Pokeball" />,
    );
    const ball = container.querySelector('[data-testid="ball"]');
    expect(ball?.className).toContain('custom-class');
    expect(ball?.getAttribute('aria-label')).toBe('Pokeball');
  });
});
