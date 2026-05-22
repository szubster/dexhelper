// A simple, dependency-free JWT implementation for Cloudflare Workers/Pages
// using the Web Crypto API.

function encodeBase64Url(data: Uint8Array | string): string {
  let str = typeof data === 'string' ? data : String.fromCharCode(...data);
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function decodeBase64Url(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return atob(str);
}

function strToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

interface JwtPayload {
  sub?: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}

async function importKey(secret: string): Promise<CryptoKey> {
  const secretBytes = strToUint8Array(secret);
  const secretBuffer = secretBytes.buffer.slice(secretBytes.byteOffset, secretBytes.byteOffset + secretBytes.byteLength) as ArrayBuffer;

  return crypto.subtle.importKey(
    'raw',
    secretBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signJwt(payload: JwtPayload, secret: string): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };

  const encodedHeader = encodeBase64Url(JSON.stringify(header));
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));

  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await importKey(secret);

  const dataBytes = strToUint8Array(dataToSign);
  const dataBuffer = dataBytes.buffer.slice(dataBytes.byteOffset, dataBytes.byteOffset + dataBytes.byteLength) as ArrayBuffer;

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    dataBuffer
  );

  const signature = encodeBase64Url(new Uint8Array(signatureBuffer));

  return `${dataToSign}.${signature}`;
}

export async function verifyJwt(token: string, secret: string): Promise<JwtPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  if (!encodedPayload) {
    throw new Error('Invalid payload');
  }

  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await importKey(secret);

  // Re-create signature buffer from base64url
  if (!signature) {
    throw new Error('Invalid signature part');
  }

  const signatureBytes = Uint8Array.from(decodeBase64Url(signature), c => c.charCodeAt(0));
  const signatureBuffer = signatureBytes.buffer.slice(signatureBytes.byteOffset, signatureBytes.byteOffset + signatureBytes.byteLength) as ArrayBuffer;

  const dataBytes = strToUint8Array(dataToSign);
  const dataBuffer = dataBytes.buffer.slice(dataBytes.byteOffset, dataBytes.byteOffset + dataBytes.byteLength) as ArrayBuffer;

  const isValid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBuffer,
    dataBuffer
  );

  if (!isValid) {
    throw new Error('Invalid signature');
  }

  const payloadStr = decodeBase64Url(encodedPayload);
  return JSON.parse(payloadStr);
}
