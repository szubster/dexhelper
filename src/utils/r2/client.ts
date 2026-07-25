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
  async putSave(id: string, data: Uint8Array<ArrayBuffer>): Promise<void> {
    const res = await fetch(`/api/saves/${id}`, {
      method: 'PUT',
      body: data,
      headers: { 'Content-Type': 'application/octet-stream' },
    });
    if (!res.ok) throw new Error('Failed to put save');
  },
};
