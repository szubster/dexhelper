export function diffHeldItems(oldItems: number[], newItems: number[]): number[] {
  const oldCount = new Map<number, number>();

  for (const item of oldItems) {
    oldCount.set(item, (oldCount.get(item) || 0) + 1);
  }

  const result: number[] = [];

  for (const item of newItems) {
    const currentCount = oldCount.get(item) || 0;
    if (currentCount > 0) {
      oldCount.set(item, currentCount - 1);
    } else {
      result.push(item);
    }
  }

  return result;
}
