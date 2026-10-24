import { expect, test } from '@playwright/test';
import {
  createAsyncBinaryChunkStream,
  createBinaryChunkStream,
} from '../../src/engine/saveParser/utils/binaryChunkStream';

test.describe('Binary Chunk Stream Integration', () => {
  test('should chunk a binary stream synchronously', async () => {
    const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7]);
    const stream = createBinaryChunkStream(data, 3);
    const chunks = Array.from(stream);

    expect(chunks.length).toBe(3);
    // biome-ignore lint/style/noNonNullAssertion: testing array length is fixed
    expect(Array.from(chunks[0]!)).toEqual([1, 2, 3]);
    // biome-ignore lint/style/noNonNullAssertion: testing array length is fixed
    expect(Array.from(chunks[1]!)).toEqual([4, 5, 6]);
    // biome-ignore lint/style/noNonNullAssertion: testing array length is fixed
    expect(Array.from(chunks[2]!)).toEqual([7]);
  });

  test('should chunk an async readable stream', async () => {
    // Create a mock stream
    const mockStream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([1, 2, 3]));
        controller.enqueue(new Uint8Array([4, 5, 6, 7]));
        controller.close();
      },
    });

    const stream = createAsyncBinaryChunkStream(mockStream, 3);
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBe(3);
    // biome-ignore lint/style/noNonNullAssertion: testing array length is fixed
    expect(Array.from(chunks[0]!)).toEqual([1, 2, 3]);
    // biome-ignore lint/style/noNonNullAssertion: testing array length is fixed
    expect(Array.from(chunks[1]!)).toEqual([4, 5, 6]);
    // biome-ignore lint/style/noNonNullAssertion: testing array length is fixed
    expect(Array.from(chunks[2]!)).toEqual([7]);
  });
});
