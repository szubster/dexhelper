export function objectEntries<K extends string, V>(obj: Partial<Record<K, V>>): [K, V][] {
  return Object.entries(obj) as [K, V][];
}
export function objectKeys<K extends string, V>(obj: Partial<Record<K, V>>): K[] {
  return Object.keys(obj) as K[];
}
