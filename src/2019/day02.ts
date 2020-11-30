import Puzzle from '../puzzle';
import {parseProgram, runOpcode} from './intcode';

function getResult(intcode: number[], noun: number, verb: number): number {
  intcode[1] = noun;
  intcode[2] = verb;
  runOpcode(intcode);
  return intcode[0];
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => getResult(parseProgram(input), 12, 2),

  part2(input: string): number {
    const program = parseProgram(input);
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        if (getResult([...program], i, j) === 19690720) {
          return i * 100 + j;
        }
      }
    }
    return -1;
  }
}
