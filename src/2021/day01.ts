import Puzzle from '../puzzle';
import { parseInput } from '../utils';

export const solution: Puzzle<number> = {
  part1(input: string): number {
    return parseInput(input)
      .map(Number)
      .reduce((r, c, i, all) => (c < (all[i + 1] ?? 0) ? r + 1 : r), 0);
  },

  part2(input: string): number {
    return parseInput(input)
      .map(Number)
      .reduce((r, c, i, all) => (c < (all[i + 3] ?? 0) ? r + 1 : r), 0);
  },
};
