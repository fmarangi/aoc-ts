import {countArrangements, solution} from '../../src/2020/day10';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 10: Adapter Array', () => {
  it('counts the arrangements', () => {
    expect(countArrangements([16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4])).toBe(8);
    expect(countArrangements([28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19,
      38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3])).toBe(19208);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day10.txt')).toString();
    expect(solution.part1(input)).toBe(2400);
    expect(solution.part2(input)).toBe(338510590509056);
  });
});
