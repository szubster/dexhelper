import { describe, it, expect, vi } from 'vitest';
import { onRequestGet, onRequestPut, isValidSaveId } from '../[id]';
import type { Env } from '../../../types/env';
import type { R2Bucket } from '@cloudflare/workers-types';

describe('isValidSaveId', () => {
  it('accepts valid save IDs', () => {
    expect(isValidSaveId('save1')).toBe(true);
    expect(isValidSaveId('pokemon-red.sav')).toBe(true);
    expect(isValidSaveId('user_save_123')).toBe(true);
  });

  it('rejects path traversal attempts', () => {
    expect(isValidSaveId('../otheruser/save')).toBe(false);
    expect(isValidSaveId('../../etc/passwd')).toBe(false);
    expect(isValidSaveId('..\\windows\\system32')).toBe(false);
    expect(isValidSaveId('folder/save1')).toBe(false);
    expect(isValidSaveId('folder\\save1')).toBe(false);
    expect(isValidSaveId('..%2f..%2fotheruser')).toBe(false);
    expect(isValidSaveId('%2e%2e%2f')).toBe(false);
  });

  it('rejects empty, invalid, or hidden IDs', () => {
    expect(isValidSaveId('')).toBe(false);
    expect(isValidSaveId('   ')).toBe(false);
    expect(isValidSaveId('.hidden')).toBe(false);
    expect(isValidSaveId(null)).toBe(false);
    expect(isValidSaveId(undefined)).toBe(false);
  });
});

describe('functions/api/saves/[id] handlers', () => {
  const mockEmail = 'user@example.com';
  const mockContextData = {
    cloudflareAccess: {
      JWT: {
        payload: {
          email: mockEmail,
        },
      },
    },
  };

  describe('onRequestGet', () => {
    it('returns 401 if unauthorized (missing email)', async () => {
      const response = await onRequestGet({
        env: {} as any,
        params: { id: 'save1' },
        data: {},
        request: new Request('http://localhost/api/saves/save1'),
      } as any);

      expect(response.status).toBe(401);
    });

    it('returns 400 Bad Request on path traversal in params.id', async () => {
      const mockGet = vi.fn<any>();
      const mockEnv = {
        SAVES_BUCKET: { get: mockGet } as unknown as R2Bucket,
      } as Env;

      const response = await onRequestGet({
        env: mockEnv,
        params: { id: '../otheruser/save' },
        data: mockContextData,
        request: new Request('http://localhost/api/saves/../otheruser/save'),
      } as any);

      expect(response.status).toBe(400);
      expect(mockGet).not.toHaveBeenCalled();
    });

    it('returns 200 and save content for valid params.id', async () => {
      const mockGet = vi.fn<any>().mockResolvedValue({
        body: 'save-data-stream',
        writeHttpMetadata: vi.fn<any>(),
        httpEtag: 'etag-123',
        customMetadata: { 'client-last-modified': '1234567890' },
      });
      const mockEnv = {
        SAVES_BUCKET: { get: mockGet } as unknown as R2Bucket,
      } as Env;

      const response = await onRequestGet({
        env: mockEnv,
        params: { id: 'save1' },
        data: mockContextData,
        request: new Request('http://localhost/api/saves/save1'),
      } as any);

      expect(response.status).toBe(200);
      expect(mockGet).toHaveBeenCalledWith('user@example.com/save1');
      expect(response.headers.get('client-last-modified')).toBe('1234567890');
    });
  });

  describe('onRequestPut', () => {
    it('returns 401 if unauthorized (missing email)', async () => {
      const response = await onRequestPut({
        env: {} as any,
        params: { id: 'save1' },
        data: {},
        request: new Request('http://localhost/api/saves/save1', { method: 'PUT' }),
      } as any);

      expect(response.status).toBe(401);
    });

    it('returns 400 Bad Request on path traversal in params.id', async () => {
      const mockPut = vi.fn<any>();
      const mockEnv = {
        SAVES_BUCKET: { put: mockPut } as unknown as R2Bucket,
      } as Env;

      const response = await onRequestPut({
        env: mockEnv,
        params: { id: '../../etc/passwd' },
        data: mockContextData,
        request: new Request('http://localhost/api/saves/../../etc/passwd', { method: 'PUT' }),
      } as any);

      expect(response.status).toBe(400);
      expect(mockPut).not.toHaveBeenCalled();
    });

    it('returns 201 Created for valid params.id and puts object into R2 bucket', async () => {
      const mockPut = vi.fn<any>().mockResolvedValue(undefined);
      const mockEnv = {
        SAVES_BUCKET: { put: mockPut } as unknown as R2Bucket,
      } as Env;

      const request = new Request('http://localhost/api/saves/save1', {
        method: 'PUT',
        headers: { 'client-last-modified': '1234567890' },
        body: 'save-content',
      });

      const response = await onRequestPut({
        env: mockEnv,
        params: { id: 'save1' },
        data: mockContextData,
        request,
      } as any);

      expect(response.status).toBe(201);
      expect(mockPut).toHaveBeenCalledWith(
        'user@example.com/save1',
        expect.anything(),
        {
          customMetadata: {
            'client-last-modified': '1234567890',
          },
        }
      );
    });
  });
});
