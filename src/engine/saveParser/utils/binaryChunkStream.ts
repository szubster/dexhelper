/**
 * @module saveParser/utils/binaryChunkStream
 *
 * Provides streaming generators for slicing large binary buffers or web `ReadableStream` sources
 * into fixed-size chunks (`Uint8Array`).
 *
 * ## Architecture Overview
 * Binary streaming allows the save file parser, IndexedDB sync engines, and network clients
 * to process large save payloads or binary exports incrementally without allocating massive
 * intermediate memory buffers upfront.
 */

/**
 * Creates a synchronous generator that yields slices of a binary buffer in fixed-size chunks.
 *
 * **Memory Optimization:**
 * Uses `Uint8Array.prototype.subarray()` to create zero-copy view slices into the original
 * ArrayBuffer, avoiding unnecessary byte copies and memory allocation overhead.
 *
 * @param buffer - The input binary Uint8Array buffer to be chunked.
 * @param chunkSize - The maximum byte length for each yielded chunk.
 * @returns A generator yielding Uint8Array chunk views.
 *
 * @example
 * const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7]);
 * for (const chunk of createBinaryChunkStream(data, 3)) {
 *   console.log(chunk); // Uint8Array[1, 2, 3], Uint8Array[4, 5, 6], Uint8Array[7]
 * }
 */
export function* createBinaryChunkStream(buffer: Uint8Array, chunkSize: number) {
  let offset = 0;
  while (offset < buffer.length) {
    // Zero-copy view slice into the original buffer
    yield buffer.subarray(offset, Math.min(offset + chunkSize, buffer.length));
    offset += chunkSize;
  }
}

/**
 * Creates an asynchronous generator that buffers an incoming web `ReadableStream<Uint8Array>`
 * and yields fixed-size `Uint8Array` chunks.
 *
 * **Resource Management & Slicing:**
 * Accumulates incoming stream chunks until at least `chunkSize` bytes are available, then yields
 * exact `chunkSize` slices. Ensures the stream reader lock is released in a `finally` block
 * even if the iteration is aborted early.
 *
 * @param stream - The incoming web ReadableStream yielding Uint8Array chunks.
 * @param chunkSize - The target byte length for each yielded chunk.
 * @returns An async generator yielding fixed-size Uint8Array chunks.
 *
 * @example
 * const stream = response.body; // ReadableStream<Uint8Array>
 * for await (const chunk of createAsyncBinaryChunkStream(stream, 1024)) {
 *   await processChunk(chunk);
 * }
 */
export async function* createAsyncBinaryChunkStream(stream: ReadableStream<Uint8Array>, chunkSize: number) {
  const reader = stream.getReader();
  let buffer = new Uint8Array(0);

  try {
    while (true) {
      // Yield fixed-size chunks as long as enough buffered bytes remain
      if (buffer.length >= chunkSize) {
        yield buffer.subarray(0, chunkSize);
        buffer = buffer.subarray(chunkSize);
        continue;
      }

      const { done, value } = await reader.read();

      if (done) {
        // Yield any remaining trailing bytes before terminating
        if (buffer.length > 0) {
          yield buffer;
        }
        break;
      }

      // Concatenate newly read chunk with residual buffer
      const newBuffer = new Uint8Array(buffer.length + value.length);
      newBuffer.set(buffer, 0);
      newBuffer.set(value, buffer.length);
      buffer = newBuffer;
    }
  } finally {
    // Ensure reader lock is released even on early break/throw
    reader.releaseLock();
  }
}
