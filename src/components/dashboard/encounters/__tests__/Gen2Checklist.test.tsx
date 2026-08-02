import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { Gen2Checklist } from '../Gen2Checklist';

describe('Gen2Checklist', () => {
  it('renders null if generation is not 2', () => {
    const saveData = { generation: 3, gen2StaticEncounters: {} } as SaveData;
    const { container } = render(<Gen2Checklist saveData={saveData} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null if gen2StaticEncounters is missing', () => {
    const saveData = { generation: 2 } as SaveData;
    const { container } = render(<Gen2Checklist saveData={saveData} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly with claims', () => {
    const saveData = {
      generation: 2,
      gen2StaticEncounters: {
        sudowoodo: true,
        snorlax: false,
        redGyarados: true,
        hoOh: false,
        lugia: false,
      },
    } as SaveData;

    render(<Gen2Checklist saveData={saveData} />);

    expect(screen.getByText('GEN 2 STATIC ENCOUNTERS')).toBeInTheDocument();

    const sudowoodo = screen.getByText('Sudowoodo').parentElement;
    expect(sudowoodo).toHaveTextContent('[X]');

    const snorlax = screen.getByText('Snorlax').parentElement;
    expect(snorlax).toHaveTextContent('[ ]');

    const redGyarados = screen.getByText('Red Gyarados').parentElement;
    expect(redGyarados).toHaveTextContent('[X]');
  });
});
