import {solution} from '../../src/2019/day05';
import {readFileSync} from 'fs';
import {join} from 'path';
import {runProgram} from "../../src/2019/intcode";

describe('December 5th, 2019', () => {
  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day05.txt')).toString();
    expect(solution.part1(input)).toBe(5074395);
    expect(solution.part2(input)).toBe(8346937);
  })
});
