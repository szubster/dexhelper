import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { r2Client } from '../client';

describe('r2Client', () => {
  let mockFetch: Mock<typeof fetch>;

  beforeEach(() => {
    mockFetch = vi.fn<typeof fetch>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    global.fetch = mockFetch as any;
  });

  it('lists saves', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'save1' }, { id: 'save2', lastModified: 100 }],
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);

    const saves = await r2Client.listSaves();
    expect(mockFetch).toHaveBeenCalledWith('/api/saves');
    expect(saves).toEqual([{ id: 'save1' }, { id: 'save2', lastModified: 100 }]);
  });

  it('handles list saves error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: false,
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);
    await expect(r2Client.listSaves()).rejects.toThrow('Failed to list saves');
  });

  it('gets a save', async () => {
    const mockHeaders = new Headers();
    mockHeaders.set('client-last-modified', '12345');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
      headers: mockHeaders,
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);

    const save = await r2Client.getSave('save1');
    expect(mockFetch).toHaveBeenCalledWith('/api/saves/save1');
    expect(save).toEqual({ data: new Uint8Array([1, 2, 3]), lastModified: 12345 });
  });

  it('handles getSave error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);
    await expect(r2Client.getSave('error')).rejects.toThrow('Failed to get save');
  });

  it('handles getSave 404', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);

    const save = await r2Client.getSave('missing');
    expect(mockFetch).toHaveBeenCalledWith('/api/saves/missing');
    expect(save).toBeUndefined();
  });

  it('puts a save', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: true,
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);

    const data = new Uint8Array([1, 2, 3]);
    await r2Client.putSave('save1', data, 100);
    expect(mockFetch).toHaveBeenCalledWith('/api/saves/save1', {
      method: 'PUT',
      body: expect.anything(),
      headers: { 'Content-Type': 'application/octet-stream', 'client-last-modified': '100' },
    });
  });

  it('handles putSave error', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      // biome-ignore lint/suspicious/noExplicitAny: Mocking fetch requires any
    } as any);
    await expect(r2Client.putSave('error', new Uint8Array())).rejects.toThrow('Failed to put save');
  });
});
