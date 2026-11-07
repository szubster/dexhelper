import type { Env } from '../types/env';
import { getGoogleDriveAccessToken } from './google-drive-auth';

export async function downloadFileFromGoogleDrive(env: Env, fileId: string): Promise<ArrayBuffer> {
  const token = await getGoogleDriveAccessToken(env);
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to download file from Google Drive: ${response.status} ${errorText}`);
  }

  return response.arrayBuffer();
}
