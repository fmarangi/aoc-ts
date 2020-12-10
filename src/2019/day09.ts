import Puzzle from '../puzzle';
import {parseProgram, runProgram} from './intcode';

export const solution: Puzzle<number> = {
  part1: (input: string): number => runProgram(parseProgram(input), [1]).pop(),
  part2: (input: string): number => runProgram(parseProgram(input), [2]).pop()
}
