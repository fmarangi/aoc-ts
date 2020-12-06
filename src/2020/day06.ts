import Puzzle from '../puzzle';
import {intersection, sum, union} from '../utils';

const answersPerGroup = (group: string): Set<string>[] =>
  group.trim().split("\n").map(g => new Set(g.split('')));

export const solution: Puzzle<number> = {
  part1: (input: string): number =>
    input.split("\n\n").map(g => answersPerGroup(g).reduce(union).size).reduce(sum),

  part2: (input: string): number =>
    input.split("\n\n").map(g => answersPerGroup(g).reduce(intersection).size).reduce(sum)
}
