export const r2Client = {
  async listSaves(): Promise<string[]> {
    const res = await fetch('/api/saves');
    if (!res.ok) throw new Error('Failed to list saves');
    return res.json();
  },
  async getSave(id: string): Promise<Uint8Array | undefined> {
    const res = await fetch(`/api/saves/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error('Failed to get save');
    const buffer = await res.arrayBuffer();
    return new Uint8Array(buffer);
  },
  async putSave(id: string, data: Uint8Array): Promise<void> {
    const res = await fetch(`/api/saves/${id}`, {
      method: 'PUT',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // biome-ignore lint/suspicious/noExplicitAny: Blob buffer mismatch
      body: data as any,
      headers: { 'Content-Type': 'application/octet-stream' },
    });
    if (!res.ok) throw new Error('Failed to put save');
  },
};
