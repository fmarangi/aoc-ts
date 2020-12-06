import {solution} from '../../src/2020/day06';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 6: Custom Customs', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day06.txt')).toString();
    expect(solution.part1(input)).toBe(7027);
    expect(solution.part2(input)).toBe(3579);
  });
});
