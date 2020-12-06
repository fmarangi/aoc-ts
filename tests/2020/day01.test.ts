import {solution} from '../../src/2020/day01';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 1: Report Repair', () =>  {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day01.txt')).toString();
    expect(solution.part1(input)).toBe(731731);
    expect(solution.part2(input)).toBe(116115990);
  });
});
