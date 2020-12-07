import {solution} from '../../src/2020/day07';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 7: Handy Haversacks', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day07.txt')).toString();
    expect(solution.part1(input)).toBe(213);
    expect(solution.part2(input)).toBe(38426);
  });
});
