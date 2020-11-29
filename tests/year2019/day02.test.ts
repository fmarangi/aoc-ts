import {solution} from '../../src/2019/day02';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('December 2nd, 2019', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day02.txt')).toString();
    expect(solution.part1(input)).toBe(3409710);
    expect(solution.part2(input)).toBe(7912);
  })
});
