export function calculateReturnBasePower(friendship: number): number {
  const power = Math.floor(friendship / 2.5);
  return Math.min(102, Math.max(0, power));
}

export function calculateFrustrationBasePower(friendship: number): number {
  const power = Math.floor((255 - friendship) / 2.5);
  return Math.min(102, Math.max(0, power));
}
