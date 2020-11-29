import {parseInput, prd, sum} from '../utils';

const enum Opcode {
  ADDITION = 1,
  MULTIPLICATION,
  EXIT = 99
}

export function runProgram(intcode: number[], position: number = 0): number[] {
  const [opcode, a, b, dest] = intcode.slice(position, position + 4);
  switch (opcode) {
    case Opcode.ADDITION:
      intcode[dest] = sum(intcode[a], intcode[b]);
      break;
    case Opcode.MULTIPLICATION:
      intcode[dest] = prd(intcode[a], intcode[b]);
      break;
    case Opcode.EXIT:
      return intcode;
  }
  return runProgram(intcode, position + 4);
}

export const parseProgram = (input: string): number[] => parseInput(input, ',').map(Number);
