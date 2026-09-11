// Large generated typescript file for benchmarking
export type DeepNested<T> = {
  [K in keyof T]: T[K] extends object ? DeepNested<T[K]> : T[K];
};

export interface VeryLargeInterface {
  prop1: string;
  prop2: number;
  prop3: boolean;
  prop4: string[];
  prop5: DeepNested<{ a: { b: { c: string } } }>;
  prop6: Array<DeepNested<{ x: number }>>;
}

export function processLargeInterface(data: VeryLargeInterface): boolean {
  if (data.prop1 === 'test') {
    return data.prop2 > 10;
  }
  return false;
}
