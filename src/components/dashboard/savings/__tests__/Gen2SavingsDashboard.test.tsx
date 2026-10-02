import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as emulatorContext from '../../../../contexts/EmulatorContext';
import { Gen2SavingsDashboard } from '../Gen2SavingsDashboard';

vi.mock('../../../../contexts/EmulatorContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../contexts/EmulatorContext')>();
  return {
    ...actual,
    useParsedSaveData: vi.fn<typeof actual.useParsedSaveData>(),
  };
});

describe('Gen2SavingsDashboard', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 2 data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockReturnValue({
      generation: 2,
      gen2MomsSavings: {
        money: 15000,
        savingActive: true,
      },
    } as unknown as import('../../../../engine/saveParser/parsers/common').SaveData);

    await render(<Gen2SavingsDashboard />);

    await expect.element(page.getByText('BANK OF MOM')).toBeInTheDocument();
    await expect.element(page.getByText('₽15,000', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('SAVING ACTIVE')).toBeInTheDocument();
    // Test the thresholds
    await expect.element(page.getByText('NEXT UNLOCK: CLEFAIRY DOLL')).toBeInTheDocument();
    await expect.element(page.getByText('₽15,000 REMAINING')).toBeInTheDocument();
  });

  it('renders correctly when all thresholds are reached', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockReturnValue({
      generation: 2,
      gen2MomsSavings: {
        money: 150000,
        savingActive: false,
      },
    } as unknown as import('../../../../engine/saveParser/parsers/common').SaveData);

    await render(<Gen2SavingsDashboard />);

    await expect.element(page.getByText('BANK OF MOM')).toBeInTheDocument();
    await expect.element(page.getByText('₽150,000')).toBeInTheDocument();
    await expect.element(page.getByText('SAVING INACTIVE')).toBeInTheDocument();
    await expect.element(page.getByText('ALL THRESHOLDS REACHED')).toBeInTheDocument();
  });

  it('does not render for gen 3 data', async () => {
    vi.mocked(emulatorContext.useParsedSaveData).mockReturnValue({
      generation: 3,
    } as unknown as import('../../../../engine/saveParser/parsers/common').SaveData);

    await render(<Gen2SavingsDashboard />);

    await expect.element(page.getByText('BANK OF MOM')).not.toBeInTheDocument();
  });
});
