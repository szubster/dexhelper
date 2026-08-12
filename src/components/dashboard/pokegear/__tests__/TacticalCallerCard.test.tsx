import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TacticalCallerCard } from '../TacticalCallerCard';

describe('TacticalCallerCard', () => {
  it('renders a STANDARD contact correctly', () => {
    render(<TacticalCallerCard contact={{ id: 1, name: 'Youngster Joey' }} probability={50} isCoolingDown={false} />);

    expect(screen.getByText('Youngster Joey')).toBeDefined();
    expect(screen.getByText('PROB: 50%')).toBeDefined();
    expect(screen.getByText('[ TARGET_LOCK ]')).toBeDefined();
    expect(screen.queryByText(/\[ SWARM \]/)).toBeNull();
    expect(screen.queryByText(/\[ ITEM \]/)).toBeNull();
    expect(screen.queryByText(/INFO:/)).toBeNull();
  });

  it('renders a SWARM contact correctly', () => {
    render(
      <TacticalCallerCard
        contact={{ id: 17, name: 'Fisher Ralph' }}
        highValueData={{ name: 'Fisher Ralph', type: 'SWARM', details: 'Qwilfish' }}
        probability={50}
        isCoolingDown={false}
      />,
    );

    expect(screen.getByText('Fisher Ralph')).toBeDefined();
    expect(screen.getByText('[ TARGET_LOCK ]')).toBeDefined();
    expect(screen.getByText('[ SWARM ]')).toBeDefined();
    expect(screen.getByText('INFO: Qwilfish')).toBeDefined();
  });

  it('renders an ITEM contact correctly', () => {
    render(
      <TacticalCallerCard
        contact={{ id: 6, name: 'Pokefan Beverly' }}
        highValueData={{ name: 'Pokefan Beverly', type: 'ITEM', details: 'Nugget' }}
        probability={50}
        isCoolingDown={true}
      />,
    );

    expect(screen.getByText('Pokefan Beverly')).toBeDefined();
    expect(screen.getByText('[ TARGET_LOCK ]')).toBeDefined();
    expect(screen.getByText('[ ITEM ]')).toBeDefined();
    expect(screen.getByText('INFO: Nugget')).toBeDefined();
    expect(screen.getByText('PROB: 50%')).toBeDefined();
  });
});
