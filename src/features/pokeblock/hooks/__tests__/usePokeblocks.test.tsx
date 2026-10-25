import type React from 'react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Gen2SaveData, Gen3SaveData } from '../../../../engine/saveParser/parsers/common';
import { useStore } from '../../../../store';
import { usePokeblocks } from '../usePokeblocks';

const TestComponent: React.FC = () => {
  const pokeblocks = usePokeblocks();
  return <div data-testid="result">{pokeblocks ? JSON.stringify(pokeblocks) : 'undefined'}</div>;
};

describe('usePokeblocks', () => {
  it('returns undefined when saveData is null', async () => {
    useStore.setState({ saveData: null });
    await render(<TestComponent />);
    await expect.element(page.getByTestId('result')).toHaveTextContent('undefined');
  });

  it('returns undefined when gen3Pokeblocks is missing (e.g. Gen 2)', async () => {
    useStore.setState({ saveData: { generation: 2 } as Gen2SaveData });
    await render(<TestComponent />);
    await expect.element(page.getByTestId('result')).toHaveTextContent('undefined');
  });

  it('returns gen3Pokeblocks when they are present', async () => {
    const mockPokeblocks = [{ color: 1, spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 20 }];
    useStore.setState({
      saveData: {
        generation: 3,
        gen3Pokeblocks: mockPokeblocks,
      } as unknown as Gen3SaveData,
    });
    await render(<TestComponent />);
    await expect.element(page.getByTestId('result')).toHaveTextContent(JSON.stringify(mockPokeblocks));
  });
});
