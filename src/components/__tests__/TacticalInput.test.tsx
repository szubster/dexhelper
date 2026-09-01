import { Search } from 'lucide-react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalInput } from '../TacticalInput';

describe('TacticalInput', () => {
  it('renders correctly with tactical utility classes', async () => {
    await render(<TacticalInput placeholder="Test Input" />);
    const input = page.getByPlaceholder('Test Input');
    await expect.element(input).toBeInTheDocument();
    await expect.element(input).toHaveClass('tactical-input');
    const el = input.element() as HTMLInputElement;
    const classes = el.className;
    expect(classes).toContain('tactical-input');
  });

  it('handles onChange event', async () => {
    const handleChange = vi.fn<() => void>();
    await render(<TacticalInput placeholder="Test Input" onChange={handleChange} />);
    const input = page.getByPlaceholder('Test Input');
    await input.fill('new value');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders with label', async () => {
    await render(<TacticalInput label="Test Label" />);
    await expect.element(page.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with icon', async () => {
    await render(<TacticalInput icon={<Search data-testid="search-icon" size={14} />} />);
    await expect.element(page.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked and value exists', async () => {
    const onClear = vi.fn<() => void>();
    await render(<TacticalInput value="test value" onChange={() => {}} onClear={onClear} />);

    const clearButton = page.getByRole('button', { name: 'Clear input' });
    await expect.element(clearButton).toBeInTheDocument();

    await clearButton.click();
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('does not render clear button when value is empty', async () => {
    const onClear = vi.fn<() => void>();
    await render(<TacticalInput value="" onChange={() => {}} onClear={onClear} />);

    await expect.element(page.getByRole('button', { name: 'Clear input' })).not.toBeInTheDocument();
  });

  it('renders children correctly', async () => {
    await render(
      <TacticalInput>
        <div data-testid="child-element">Child Content</div>
      </TacticalInput>,
    );
    await expect.element(page.getByTestId('child-element')).toBeInTheDocument();
    await expect.element(page.getByText('Child Content')).toBeInTheDocument();
  });

  it('forwards ref correctly', async () => {
    const ref = React.createRef<HTMLInputElement>();
    await render(<TacticalInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
