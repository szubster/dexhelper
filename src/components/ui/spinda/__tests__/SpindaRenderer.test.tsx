import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { SpindaRenderer } from '../SpindaRenderer';

test('SpindaRenderer renders base sprite and 4 spots with correct tactical UI styling', async () => {
  const spots = {
    topLeft: { x: 10, y: 10 },
    topRight: { x: 40, y: 10 },
    bottomLeft: { x: 10, y: 40 },
    bottomRight: { x: 40, y: 40 },
  };

  await render(<SpindaRenderer spots={spots} className="custom-test-class" />);

  // Verify metadata text is rendered (which also proves component mounted)
  await expect.element(page.getByText('SPINDA-ID')).toBeInTheDocument();

  const rootDiv = document.querySelector('.custom-test-class');
  expect(rootDiv).toBeTruthy();
  expect(rootDiv?.classList.contains('tactical-panel')).toBe(true);

  // Count spots
  const spotsCount = document.querySelectorAll('div.absolute.rounded-full').length;
  expect(spotsCount).toBe(4);
});
