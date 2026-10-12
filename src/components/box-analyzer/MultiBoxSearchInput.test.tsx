import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { MultiBoxSearchInput } from './MultiBoxSearchInput';

vi.mock('../../store', () => ({
  useStore: vi.fn<(selector: unknown) => unknown>(),
}));

describe('MultiBoxSearchInput', () => {
  it('renders correctly', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Required for vitest mocks
    (useStore as any).mockImplementation((selector: any) => {
      const mockState = {
        searchTerm: '',
        setSearchTerm: vi.fn<(v: string) => void>(),
      };
      return selector(mockState);
    });

    await render(<MultiBoxSearchInput />);
    await expect.element(page.getByTestId('multi-box-search-input')).toBeInTheDocument();
  });

  it('handles input correctly', async () => {
    const setSearchTermMock = vi.fn<(v: string) => void>();
    // biome-ignore lint/suspicious/noExplicitAny: Required for vitest mocks
    (useStore as any).mockImplementation((selector: any) => {
      const mockState = {
        searchTerm: '',
        setSearchTerm: setSearchTermMock,
      };
      return selector(mockState);
    });

    await render(<MultiBoxSearchInput />);
    const input = page.getByTestId('multi-box-search-input');
    await input.fill('Pikachu');
    await expect.element(input).toHaveValue('Pikachu');
    expect(setSearchTermMock).toHaveBeenCalledWith('Pikachu');
  });

  it('clears input correctly when clear button is pressed', async () => {
    const setSearchTermMock = vi.fn<(v: string) => void>();
    // biome-ignore lint/suspicious/noExplicitAny: Required for vitest mocks
    (useStore as any).mockImplementation((selector: any) => {
      const mockState = {
        searchTerm: 'Pikachu',
        setSearchTerm: setSearchTermMock,
      };
      return selector(mockState);
    });

    await render(<MultiBoxSearchInput />);
    const input = page.getByTestId('multi-box-search-input');
    await expect.element(input).toHaveValue('Pikachu');
    const clearButton = page.getByTitle('Clear input');
    await clearButton.click();
    await expect.element(input).toHaveValue('');
    expect(setSearchTermMock).toHaveBeenCalledWith('');
  });

  it('clears input correctly when escape key is pressed', async () => {
    const setSearchTermMock = vi.fn<(v: string) => void>();
    // biome-ignore lint/suspicious/noExplicitAny: Required for vitest mocks
    (useStore as any).mockImplementation((selector: any) => {
      const mockState = {
        searchTerm: 'Pikachu',
        setSearchTerm: setSearchTermMock,
      };
      return selector(mockState);
    });

    await render(<MultiBoxSearchInput />);
    const input = page.getByTestId('multi-box-search-input');
    await expect.element(input).toHaveValue('Pikachu');

    await userEvent.click(input);
    await userEvent.keyboard('{Escape}');

    await expect.element(input).toHaveValue('');
    expect(setSearchTermMock).toHaveBeenCalledWith('');
  });
});
