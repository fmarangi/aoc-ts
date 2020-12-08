import {fixBootCode, parseInput, runBootCode, solution} from '../../src/2020/day08';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 8: Handheld Halting', () => {
  it('runs the boot code', () => {
    expect(runBootCode(parseInput("nop +0\n" +
      "acc +1\n" +
      "jmp +4\n" +
      "acc +3\n" +
      "jmp -3\n" +
      "acc -99\n" +
      "acc +1\n" +
      "jmp -4\n" +
      "acc +6"))).toBe(5);
  });

  it('fixes the boot code', () => {
    expect(fixBootCode(parseInput("nop +0\n" +
      "acc +1\n" +
      "jmp +4\n" +
      "acc +3\n" +
      "jmp -3\n" +
      "acc -99\n" +
      "acc +1\n" +
      "jmp -4\n" +
      "acc +6"))).toBe(8);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day08.txt')).toString();
    expect(solution.part1(input)).toBe(1200);
    expect(solution.part2(input)).toBe(1023);
  });
});
