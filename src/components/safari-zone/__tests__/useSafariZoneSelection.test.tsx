import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useSafariZoneSelection } from '../useSafariZoneSelection';

function TestComponent({
  initialVersion,
  initialTargetPokemon,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: Required for test component
  initialVersion?: any;
  // biome-ignore lint/suspicious/noExplicitAny: Required for test component
  initialTargetPokemon?: any;
}) {
  const { version, targetPokemon, availableAreas, setVersion, setTargetPokemon } = useSafariZoneSelection({
    initialVersion,
    initialTargetPokemon,
  });

  return (
    <div>
      <div data-testid="version">{version}</div>
      <div data-testid="targetPokemon">{targetPokemon === null ? 'null' : targetPokemon}</div>
      <div data-testid="availableAreasCount">{availableAreas.length}</div>
      <button type="button" onClick={() => setVersion('firered')}>
        Set FireRed
      </button>
      <button type="button" onClick={() => setTargetPokemon(25)}>
        Set Pikachu
      </button>
      <button type="button" onClick={() => setTargetPokemon(150)}>
        Set Mewtwo
      </button>
    </div>
  );
}

describe('useSafariZoneSelection', () => {
  it('should initialize with default values', async () => {
    expect.hasAssertions();
    await render(<TestComponent />);

    await expect.element(page.getByTestId('version')).toHaveTextContent('emerald');
    await expect.element(page.getByTestId('targetPokemon')).toHaveTextContent('null');
    // Emerald has 6 areas
    await expect.element(page.getByTestId('availableAreasCount')).toHaveTextContent('6');
  });

  it('should initialize with provided values', async () => {
    expect.hasAssertions();
    await render(<TestComponent initialVersion="red" initialTargetPokemon={1} />);

    await expect.element(page.getByTestId('version')).toHaveTextContent('red');
    await expect.element(page.getByTestId('targetPokemon')).toHaveTextContent('1');
  });

  it('should update version', async () => {
    expect.hasAssertions();
    await render(<TestComponent />);

    await page.getByText('Set FireRed').click();

    await expect.element(page.getByTestId('version')).toHaveTextContent('firered');
  });

  it('should filter areas based on selected Pokemon', async () => {
    expect.hasAssertions();
    await render(<TestComponent initialVersion="emerald" />);

    // Initial state: all 6 areas in Emerald
    await expect.element(page.getByTestId('availableAreasCount')).toHaveTextContent('6');

    // Pikachu is in safari zone area 1 and 2 in emerald (pokemon ID 25)
    await page.getByText('Set Pikachu').click();

    await expect.element(page.getByTestId('availableAreasCount')).toHaveTextContent('2');
  });

  it('should return no areas if Pokemon is not in the safari zone for the version', async () => {
    expect.hasAssertions();
    await render(<TestComponent initialVersion="emerald" />);

    await page.getByText('Set Mewtwo').click();

    await expect.element(page.getByTestId('availableAreasCount')).toHaveTextContent('0');
  });
});
