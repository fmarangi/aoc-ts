import Puzzle from '../puzzle';
import {Opcode, parseProgram, runCommand, runProgram} from './intcode';
import {permutations} from '../utils';

const acs = (amp: number[], intcode: number[]): number => {
  return amp.reduce((output, a) => runProgram(intcode, [a, ...output]), [0]).pop();
}

const amplifier = (intcode: number[], id: number) => {
  let pos = 0, relativeBase = 0, _input = [id];
  return (input: number): number[] => {
    let output: number[] = [];
    _input.push(input);
    while (true) {
      switch (intcode[pos] % 100) {
        case Opcode.HALT:
          return output;
        case Opcode.INPUT:
          if (!_input.length) {
            throw output.shift()
          }
      }
      [intcode, _input, output, pos, relativeBase] = runCommand(intcode, _input, output, pos, relativeBase);
    }
  };
}

const feedbackLoop = (amp: number[], intcode: number[], input: number = 0): number => {
  const amplifiers = amp.map((s) => amplifier([...intcode], s));
  for (let n = 0, i = 0, stop = false; !stop || n % amp.length !== 0; n++) {
    try {
      input = amplifiers[n % amplifiers.length](input).pop();
      stop = true;
    } catch (e) {
      input = e;
    }
  }
  return input;
};

export const largestSignal = (intcode: number[], amplifiers: number[] = [0, 1, 2, 3, 4]): number => {
  return permutations(amplifiers).map(s => acs(s, intcode)).reduce((a, b) => Math.max(a, b));
}

export const largestSignalWithLoop = (intcode: number[], amplifiers: number[] = [5, 6, 7, 8, 9]): number => {
  return permutations(amplifiers).map(s => feedbackLoop(s, intcode)).reduce((a, b) => Math.max(a, b));
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => largestSignal(parseProgram(input)),
  part2: (input: string): number => largestSignalWithLoop(parseProgram(input))
};
