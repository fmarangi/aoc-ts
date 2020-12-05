import Puzzle from '../puzzle';
import {parseInput} from '../utils';

export const seatId = (code: string): number =>
  parseInt(code.replace(/[BR]/g, '1').replace(/[FL]/g, '0'), 2);

const missingSeat = (seats: Set<number>, max: number): number =>
  Array.from(Array(max).keys()).filter(x => !seats.has(x)).pop();

export const solution: Puzzle<number> = {
  part1: (input: string): number => Math.max(...parseInput(input).map(seatId)),
  part2: (input: string): number => missingSeat(new Set(parseInput(input).map(seatId)), solution.part1(input)),
}
