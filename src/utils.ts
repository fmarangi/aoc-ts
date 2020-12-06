export const parseInput = (input: string, delimiter: string = "\n"): string[] => input.trim().split(delimiter);

export const gcd = (a: number, b: number): number => !b ? a : gcd(b, a % b);
export const lcm = (a: number, b: number): number => Math.abs(a * b) / gcd(a, b);

export const sum = (a: number, b: number): number => a + b;
export const prd = (a: number, b: number): number => a * b;

export const between = (x: any, from: number, to: number): boolean => Number(x) >= from && Number(x) <= to;

export const union = <T>(a: Set<T>, b: Set<T>): Set<T> => new Set<T>(Array.from(a.values()).concat(Array.from(b.values())));
export const intersection = <T>(a: Set<T>, b: Set<T>): Set<T> => new Set<T>(Array.from(a.values()).filter(v => b.has(v)));
