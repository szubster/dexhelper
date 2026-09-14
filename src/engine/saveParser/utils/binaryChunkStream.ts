export function* createBinaryChunkStream(buffer: Uint8Array, chunkSize: number) {
  let offset = 0;
  while (offset < buffer.length) {
    yield buffer.subarray(offset, Math.min(offset + chunkSize, buffer.length));
    offset += chunkSize;
  }
}

export async function* createAsyncBinaryChunkStream(stream: ReadableStream<Uint8Array>, chunkSize: number) {
  const reader = stream.getReader();
  let buffer = new Uint8Array(0);

  try {
    while (true) {
      if (buffer.length >= chunkSize) {
        yield buffer.subarray(0, chunkSize);
        buffer = buffer.subarray(chunkSize);
        continue;
      }

      const { done, value } = await reader.read();

      if (done) {
        if (buffer.length > 0) {
          yield buffer;
        }
        break;
      }

      const newBuffer = new Uint8Array(buffer.length + value.length);
      newBuffer.set(buffer, 0);
      newBuffer.set(value, buffer.length);
      buffer = newBuffer;
    }
  } finally {
    reader.releaseLock();
  }
}
