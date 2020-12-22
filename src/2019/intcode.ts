import {parseInput} from '../utils';

export const enum Opcode {
  ADD = 1,
  MUL,
  INPUT,
  OUTPUT,
  JIT,
  JIF,
  LT,
  EQ,
  REL_BASE,
  HALT = 99
}

const enum ParameterMode {POSITION, IMMEDIATE, RELATIVE}

export const getModes = (opcode: number): number[] => [100, 1000, 10000].map(n => ((opcode / n) % 10) | 0);

const getIncrement = (opcode: Opcode): number => {
  const increments = {[Opcode.INPUT]: 2, [Opcode.OUTPUT]: 2, [Opcode.JIF]: 3, [Opcode.JIT]: 3, [Opcode.REL_BASE]: 2};
  return increments[opcode] || 4;
};

export const parseProgram = (input: string): number[] => parseInput(input, ',').map(Number);

const getParam = (intcode: number[], param: number, mode: ParameterMode, relativeBase: number): number => {
  switch (mode) {
    case ParameterMode.POSITION:
      return intcode[param];
    case ParameterMode.IMMEDIATE:
      return param;
    case ParameterMode.RELATIVE:
      return intcode[param] + relativeBase;
  }
};

export function runCommand(
  intcode: number[],
  input: number[],
  output: number[],
  pos: number,
  relativeBase: number
): [number[], number[], number[], number, number] {
  const opcode = intcode[pos] % 100, value = (x) => intcode[x] || 0;
  const [a, b, c] = getModes(intcode[pos]).map((mode, i) => getParam(intcode, pos + i + 1, mode, relativeBase));
  pos += getIncrement(opcode);

  switch (opcode) {
    case Opcode.ADD:
      intcode[c] = value(a) + value(b);
      break;

    case Opcode.MUL:
      intcode[c] = value(a) * value(b);
      break;

    case Opcode.INPUT:
      intcode[a] = input.shift();
      break;

    case Opcode.OUTPUT:
      output.push(value(a));
      break;

    case Opcode.JIT:
      if (value(a)) pos = value(b);
      break;

    case Opcode.JIF:
      if (!value(a)) pos = value(b);
      break;

    case Opcode.LT:
      intcode[c] = value(a) < value(b) ? 1 : 0;
      break;

    case Opcode.EQ:
      intcode[c] = value(a) === value(b) ? 1 : 0;
      break;

    case Opcode.REL_BASE:
      relativeBase += value(a);
      break;
  }

  return [intcode, input, output, pos, relativeBase];
}

export const runOpcode = (intcode: number[], input: number[] = []): number[] => {
  let output: number[] = [], pos = 0, relativeBase = 0;
  while (true) {
    [intcode, input, output, pos, relativeBase] = runCommand(intcode, input, output, pos, relativeBase);
    if (intcode[pos] % 100 === Opcode.HALT) break;
  }
  return output;
};

export const runProgram = (intcode: number[], input: number[] = []): number[] => runOpcode([...intcode], [...input]);
