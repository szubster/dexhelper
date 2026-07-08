import { r2Client } from './client';

describe('r2Client', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
  });

  it('lists saves', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ['save1', 'save2'],
    });

    const saves = await r2Client.listSaves();
    expect(mockFetch).toHaveBeenCalledWith('/api/saves');
    expect(saves).toEqual(['save1', 'save2']);
  });

  it('gets a save', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
    });

    const save = await r2Client.getSave('save1');
    expect(mockFetch).toHaveBeenCalledWith('/api/saves/save1');
    expect(save).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('handles getSave 404', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const save = await r2Client.getSave('missing');
    expect(mockFetch).toHaveBeenCalledWith('/api/saves/missing');
    expect(save).toBeUndefined();
  });

  it('puts a save', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
    });

    const data = new Uint8Array([1, 2, 3]);
    await r2Client.putSave('save1', data);
    expect(mockFetch).toHaveBeenCalledWith('/api/saves/save1', {
      method: 'PUT',
      body: expect.anything(),
      headers: { 'Content-Type': 'application/octet-stream' },
    });
  });
});
