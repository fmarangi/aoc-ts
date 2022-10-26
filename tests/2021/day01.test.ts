import { solution } from '../../src/2021/day01';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Day 1: Sonar Sweep', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(
      join(__dirname, '../../input/2021/day01.txt')
    ).toString();
    expect(solution.part1(input)).toBe(1681);
    expect(solution.part2(input)).toBe(1704);
  });
});
