import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { type WonderCardData, WonderCardPanel } from '../WonderCardPanel';

describe('WonderCardPanel', () => {
  const mockCardData: WonderCardData = {
    id: 1,
    title: 'Aurora Ticket',
    iconId: 42,
    status: 0,
  };

  it('renders WonderCardPanel with correct data', async () => {
    await render(<WonderCardPanel cardData={mockCardData} />);
    const panel = page.getByTestId('wonder-card-panel');
    await expect.element(panel).toBeInTheDocument();

    // Check that title is rendered
    await expect.element(page.getByText('Aurora Ticket')).toBeInTheDocument();

    // Check that card ID is rendered
    await expect.element(page.getByText('Card ID: 1')).toBeInTheDocument();

    // Check that icon ID is rendered
    await expect.element(page.getByText('ID:42')).toBeInTheDocument();

    // Check that status is rendered
    await expect.element(page.getByText('Status:')).toBeInTheDocument();
    await expect.element(page.getByText('0')).toBeInTheDocument();
  });
});
