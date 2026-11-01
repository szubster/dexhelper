import { describe, it, expect, vi } from 'vitest';
import { onRequestGet, onRequestPut } from '../[id]';
import type { Env } from '../../../types/env';
import type { R2Bucket } from '@cloudflare/workers-types';

describe('functions/api/saves/[id]', () => {
  const createMockContext = (id: string, email = 'user@example.com') => {
    const mockGet = vi.fn<any>();
    const mockPut = vi.fn<any>();

    const mockBucket = {
      get: mockGet,
      put: mockPut,
    } as unknown as R2Bucket;

    const env: Env = {
      SAVES_BUCKET: mockBucket,
    } as any;

    const data = {
      cloudflareAccess: {
        JWT: {
          payload: {
            email,
          },
        },
      },
    };

    const request = new Request('https://example.com', {
      method: 'PUT',
      headers: new Headers({ 'client-last-modified': '1234567890' }),
      body: 'test save data',
    });

    return {
      env,
      params: { id },
      data,
      request,
      mockGet,
      mockPut,
    };
  };

  describe('onRequestGet', () => {
    it('returns 400 Bad Request for path traversal attempts', async () => {
      const traversalIds = ['../secret', '..\\secret', 'folder/id', 'sub/../id', '..'];
      for (const id of traversalIds) {
        const ctx = createMockContext(id);
        const response = await onRequestGet(ctx as any);
        expect(response.status).toBe(400);
        expect(ctx.mockGet).not.toHaveBeenCalled();
      }
    });

    it('allows valid save id and returns object', async () => {
      const ctx = createMockContext('valid-save-123');
      const mockObject = {
        body: 'data',
        httpEtag: 'etag-123',
        writeHttpMetadata: vi.fn<any>(),
        customMetadata: { 'client-last-modified': '1234567890' },
      };
      ctx.mockGet.mockResolvedValue(mockObject);

      const response = await onRequestGet(ctx as any);
      expect(response.status).toBe(200);
      expect(ctx.mockGet).toHaveBeenCalledWith('user@example.com/valid-save-123');
    });
  });

  describe('onRequestPut', () => {
    it('returns 400 Bad Request for path traversal attempts', async () => {
      const traversalIds = ['../secret', '..\\secret', 'folder/id', 'sub/../id', '..'];
      for (const id of traversalIds) {
        const ctx = createMockContext(id);
        const response = await onRequestPut(ctx as any);
        expect(response.status).toBe(400);
        expect(ctx.mockPut).not.toHaveBeenCalled();
      }
    });

    it('allows valid save id and puts object', async () => {
      const ctx = createMockContext('valid-save-123');
      ctx.mockPut.mockResolvedValue(undefined);

      const response = await onRequestPut(ctx as any);
      expect(response.status).toBe(201);
      expect(ctx.mockPut).toHaveBeenCalledWith(
        'user@example.com/valid-save-123',
        expect.anything(),
        expect.objectContaining({ customMetadata: { 'client-last-modified': '1234567890' } })
      );
    });
  });
});
