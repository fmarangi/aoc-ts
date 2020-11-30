import {parseInput, prd, sum} from '../utils';

type IntcodeCallback = (input: number) => void;

const enum Opcode {
  ADD = 1,
  MUL,
  INPUT,
  OUTPUT,
  JIT,
  JIF,
  LT,
  EQ,
  HALT = 99
}

const enum ParameterMode {POSITION, IMMEDIATE}

export const getModes = (opcode: number): number[] => [100, 1000, 10000].map(n => ((opcode / n) % 10) | 0);

const getIncrement = (opcode: Opcode): number => {
  const increments = {[Opcode.INPUT]: 2, [Opcode.OUTPUT]: 2, [Opcode.JIF]: 3, [Opcode.JIT]: 3};
  return increments[opcode] || 4;
};

export const parseProgram = (input: string): number[] => parseInput(input, ',').map(Number);

const getParam = (intcode: number[], param: number, mode: ParameterMode): number => {
  return mode === ParameterMode.IMMEDIATE ? param : intcode[param];
};

export const runOpcode = (
  intcode: number[],
  input: number[] = [],
  position: number = 0,
  callback: IntcodeCallback = console.log
): void => {
  const opcode = intcode[position] % 100;
  const [a, _, dest] = intcode.slice(position + 1, position + 4);
  const [aVal, bVal] = getModes(intcode[position]).map((mode, i) => getParam(intcode, intcode[position + 1 + i], mode));
  position += getIncrement(opcode);

  switch (opcode) {
    case Opcode.ADD:
      intcode[dest] = sum(aVal, bVal);
      break;

    case Opcode.MUL:
      intcode[dest] = prd(aVal, bVal);
      break;

    case Opcode.INPUT:
      intcode[a] = input.shift();
      break;

    case Opcode.OUTPUT:
      callback(aVal);
      break;

    case Opcode.JIT:
      if (aVal) position = bVal;
      break;

    case Opcode.JIF:
      if (!aVal) position = bVal;
      break;

    case Opcode.LT:
      intcode[dest] = Number(aVal < bVal);
      break;

    case Opcode.EQ:
      intcode[dest] = Number(aVal === bVal);
      break;

    case Opcode.HALT:
      return;
  }

  runOpcode(intcode, input, position, callback);
};

export const runProgram = (intcode: number[], input: number[] = []): number[] => {
  const output = [];
  runOpcode([...intcode], input, 0, o => output.push(o));
  return output;
}
