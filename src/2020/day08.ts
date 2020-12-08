import Puzzle from '../puzzle';

type Instruction = 'acc' | 'jmp' | 'nop';
type BootCode = [Instruction, number][];

export const parseInput = (input: string): BootCode =>
  input.trim().split("\n").map(l => {
    const [cmd, qty] = l.split(' ');
    return [(cmd as Instruction), Number(qty)];
  });

const bootCode = (commands: BootCode) => (instruction: number, accumulator: number): [number, number] => {
  const [op, value] = commands[instruction] ?? ['nop', 0];
  switch (op) {
    case 'acc':
      return [instruction + 1, accumulator + value];
    case 'jmp':
      return [instruction + value, accumulator];
    default:
      return [instruction + 1, accumulator];
  }
}

export const runBootCode = (commands: BootCode): number => {
  const runner = bootCode(commands);
  const ops = new Set<number>();
  let [op, acc] = [0, 0];
  while (!ops.has(op)) {
    ops.add(op);
    [op, acc] = runner(op, acc);
    if (op > commands.length) throw acc;
  }
  return acc;
}

export const fixBootCode = (commands: BootCode): number => {
  for (let i = 0; i < commands.length; i++) {
    const op = commands[i][0];
    if (op === 'jmp' || op === 'nop') {
      const fixedCommands = [...commands];
      fixedCommands[i] = [op === 'jmp' ? 'nop' : 'jmp', commands[i][1]];
      try {
        runBootCode(fixedCommands);
      } catch (result) {
        return result;
      }
    }
  }
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => runBootCode(parseInput(input)),
  part2: (input: string): number => fixBootCode(parseInput(input))
};
