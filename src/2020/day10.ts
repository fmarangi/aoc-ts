import Puzzle from '../puzzle';
import {parseInput, prd} from '../utils';

const differences = (numbers: number[]): number[] =>
  numbers.sort((a: number, b: number): number => a - b)
    .map((v: number, i: number, a: number[]): number => v - (a[i - 1] ?? 0));

const findDifferences = (numbers: number[]): number =>
  Object.values(differences(numbers)
    .reduce((r: object, c: number): object => ({...r, [c]: r[c] + 1}), {1: 0, 3: 1}))
    .reduce(prd);

export const countArrangements = (numbers: number[]): number =>
  [...differences(numbers), 3].reduce(([cnt, res], diff) => {
    return diff === 1 ? [cnt + 1, res] : [0, res * [1, 1, 2, 4, 7][cnt]];
  }, [0, 1])[1];

export const solution: Puzzle<number> = {
  part1: (input: string): number => findDifferences(parseInput(input).map(Number)),
  part2: (input: string): number => countArrangements(parseInput(input).map(Number)),
};
