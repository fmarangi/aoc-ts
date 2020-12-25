import {solution} from '../../src/2019/day15';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 15: Oxygen System', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day15.txt')).toString();
    expect(solution.part1(input)).toBe(266);
    // expect(solution.part2(input)).toBe(274);
  });
});
