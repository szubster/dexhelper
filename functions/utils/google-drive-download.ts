import type { Env } from '../types/env';
import { getGoogleDriveAccessToken } from './google-drive-auth';

// 5MB limit for .sav files (most are 128KB, gen3 is 128KB)
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const MAX_EXECUTION_TIME_MS = 10000;

export async function downloadFileFromGoogleDrive(env: Env, fileId: string): Promise<ArrayBuffer> {
  const token = await getGoogleDriveAccessToken(env);

  // 1. Check file metadata (size) before initiating download
  const metadataUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=size`;
  const metadataResponse = await fetch(metadataUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!metadataResponse.ok) {
    const errorText = await metadataResponse.text();
    throw new Error(`Failed to get file metadata from Google Drive: ${metadataResponse.status} ${errorText}`);
  }

  const metadata = await metadataResponse.json() as { size?: string };
  if (metadata.size) {
    const size = parseInt(metadata.size, 10);
    if (size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File size (${size} bytes) exceeds maximum allowed size (${MAX_FILE_SIZE_BYTES} bytes)`);
    }
  }

  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

  // 2. Setup AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), MAX_EXECUTION_TIME_MS);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to download file from Google Drive: ${response.status} ${errorText}`);
    }

    return await response.arrayBuffer();
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as any).name === 'AbortError') {
      throw new Error(`Download timed out after ${MAX_EXECUTION_TIME_MS}ms`);
    }
    throw error;
  }
}
