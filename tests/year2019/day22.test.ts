import {cut, deal, dealIncr, shuffle, solution} from '../../src/2019/day22';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('December 22nd, 2019', () => {
  it('deals into new stack', () => {
    expect(deal([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  });

  it('cuts N cards', () => {
    expect(cut([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toStrictEqual([3, 4, 5, 6, 7, 8, 9, 0, 1, 2]);
    expect(cut([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], -4)).toStrictEqual([6, 7, 8, 9, 0, 1, 2, 3, 4, 5]);
  });

  it('deals with increment N', () => {
    expect(dealIncr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toStrictEqual([0, 7, 4, 1, 8, 5, 2, 9, 6, 3]);
  });

  it('runs the complete shuffle process', () => {
    expect(shuffle("deal with increment 7\ndeal into new stack\ndeal into new stack\n", 10)).toStrictEqual([0, 3, 6, 9, 2, 5, 8, 1, 4, 7]);
    expect(shuffle("cut 6\ndeal with increment 7\ndeal into new stack", 10)).toStrictEqual([3, 0, 7, 4, 1, 8, 5, 2, 9, 6]);
    expect(shuffle("deal with increment 7\ndeal with increment 9\ncut -2", 10)).toStrictEqual([6, 3, 0, 7, 4, 1, 8, 5, 2, 9]);
    expect(shuffle("deal into new stack\ncut -2\ndeal with increment 7\ncut 8\ncut -4\ndeal with increment 7\ncut 3\ndeal with increment 9\ndeal with increment 3\ncut -1", 10)).toStrictEqual([9, 2, 5, 8, 1, 4, 7, 0, 3, 6]);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day22.txt')).toString();
    expect(solution.part1(input)).toBe(3074);
  });
});
