import {prd} from '../utils';
import Puzzle from '../puzzle';

const cell = (input: string, row: number, col: number): string => {
  const rowLength = input.indexOf("\n") + 1;
  return input.charAt(row * rowLength + col % (rowLength - 1));
}

export const countTrees = (map: string, row: number = 1, col: number = 3): number => {
  let q = 0, i = 0, c: string;
  while (c = cell(map, i * row, i++ * col)) q += c === '#' ? 1 : 0;
  return q;
}

export const allSlopes = (map: string): number => {
  const slope = (data: number[]): number => countTrees(map, ...data);
  return [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]].map(slope).reduce(prd);
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => countTrees(input),
  part2: (input: string): number => allSlopes(input),
}
