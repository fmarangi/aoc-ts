import {solution, validPassword, validTobogganPassword} from '../../src/2020/day02';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('December 2nd, 2020', () => {
  it('checks password validity', () => {
    expect(validPassword('1-3 a', 'abcde')).toBe(true);
    expect(validPassword('1-3 b', 'cdefg')).toBe(false);
    expect(validPassword('2-9 c', 'ccccccccc')).toBe(true);
  });

  it('checks password validity according to Toboggan Corporate Policies', () => {
    expect(validTobogganPassword('1-3 a', 'abcde')).toBe(true);
    expect(validTobogganPassword('1-3 b', 'cdefg')).toBe(false);
    expect(validTobogganPassword('2-9 c', 'ccccccccc')).toBe(false);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day02.txt')).toString();
    expect(solution.part1(input)).toBe(614);
    expect(solution.part2(input)).toBe(354);
  });
});
