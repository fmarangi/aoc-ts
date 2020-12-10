import {solution} from '../../src/2019/day09';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 9: Sensor Boost', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day09.txt')).toString();
    expect(solution.part1(input)).toBe(2457252183);
    expect(solution.part2(input)).toBe(70634);
  })
});
