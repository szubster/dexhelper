import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FriendshipDisplay } from '../FriendshipDisplay';

test('renders FriendshipDisplay with correct friendship value and power metrics', async () => {
  await render(<FriendshipDisplay friendship={220} />);
  await expect.element(page.getByText('220').first()).toBeInTheDocument();
  await expect.element(page.getByText('RETURN_POWER').first()).toBeInTheDocument();
  await expect.element(page.getByText('FRUSTRATION_POWER').first()).toBeInTheDocument();
});
