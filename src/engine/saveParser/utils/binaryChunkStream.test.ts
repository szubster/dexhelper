import { describe, expect, it } from 'vitest';
import { createAsyncBinaryChunkStream, createBinaryChunkStream } from './binaryChunkStream.ts';

describe('binaryChunkStream', () => {
  it('yields chunks from Uint8Array', () => {
    const data = new Uint8Array([1, 2, 3, 4, 5, 6, 7]);
    const stream = createBinaryChunkStream(data, 3);
    const chunks = Array.from(stream);
    expect(chunks.length).toBe(3);
    expect(chunks[0]).toEqual(new Uint8Array([1, 2, 3]));
    expect(chunks[1]).toEqual(new Uint8Array([4, 5, 6]));
    expect(chunks[2]).toEqual(new Uint8Array([7]));
  });

  it('yields chunks from ReadableStream<Uint8Array>', async () => {
    const data1 = new Uint8Array([1, 2, 3, 4]);
    const data2 = new Uint8Array([5, 6, 7]);
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(data1);
        controller.enqueue(data2);
        controller.close();
      },
    });

    const asyncStream = createAsyncBinaryChunkStream(stream, 3);
    const chunks: Uint8Array[] = [];
    for await (const chunk of asyncStream) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBe(3);
    expect(chunks[0]).toEqual(new Uint8Array([1, 2, 3]));
    expect(chunks[1]).toEqual(new Uint8Array([4, 5, 6]));
    expect(chunks[2]).toEqual(new Uint8Array([7]));
  });
});
