
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { WallpaperDashboard } from '../WallpaperDashboard';

describe('WallpaperDashboard', () => {
  it('renders without crashing', async () => {
    await render(<WallpaperDashboard />);
    const heading = document.body.innerText.includes('PC Box Wallpapers');
    expect(heading).toBe(true);
  });
});
