import { expect, test } from '@playwright/test';

test.describe('Msgpack Prefetching', () => {
  test('should include link rel="prefetch" tags for generation-specific msgpack files', async ({ request }) => {
    const response = await request.get('./');
    expect(response.ok()).toBeTruthy();

    const html = await response.text();

    expect(html).toContain('rel="prefetch"');
    expect(html).toContain('pokedata-gen1.msgpack');
    expect(html).toContain('pokedata-gen2.msgpack');
    expect(html).toContain('pokedata-gen3.msgpack');
  });
});
