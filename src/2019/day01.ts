import Puzzle from '../puzzle';
import {parseInput, sum} from '../utils';

export const fuel = (mass: number): number => (mass / 3 | 0) - 2;

export const totalFuel = (mass: number): number => {
  const req = fuel(mass);
  return req > 0 ? req + totalFuel(req) : 0;
};

export const solution: Puzzle<number> = {
  part1: (input: string): number => parseInput(input).map(Number).map(fuel).reduce(sum),
  part2: (input: string): number => parseInput(input).map(Number).map(totalFuel).reduce(sum),
};
