export interface RemoteSave {
  id: string;
  lastModified?: number;
}

export const r2Client = {
  async listSaves(): Promise<RemoteSave[]> {
    const res = await fetch('/api/saves');
    if (!res.ok) throw new Error('Failed to list saves');
    return res.json();
  },
  async getSave(id: string): Promise<{ data: Uint8Array; lastModified?: number } | undefined> {
    const res = await fetch(`/api/saves/${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error('Failed to get save');

    const clientLastModifiedStr = res.headers.get('client-last-modified');
    const lastModified = clientLastModifiedStr ? parseInt(clientLastModifiedStr, 10) : undefined;

    const buffer = await res.arrayBuffer();
    if (lastModified !== undefined) {
      return { data: new Uint8Array(buffer), lastModified };
    }
    return { data: new Uint8Array(buffer) };
  },
  async putSave(id: string, data: Uint8Array<ArrayBuffer>, lastModified?: number): Promise<void> {
    const headers: Record<string, string> = { 'Content-Type': 'application/octet-stream' };
    if (lastModified !== undefined) {
      headers['client-last-modified'] = lastModified.toString();
    }

    const res = await fetch(`/api/saves/${id}`, {
      method: 'PUT',
      body: data,
      headers,
    });
    if (!res.ok) throw new Error('Failed to put save');
  },
};
