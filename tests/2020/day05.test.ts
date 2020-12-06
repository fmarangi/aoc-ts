import {seatId, solution} from '../../src/2020/day05';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 5: Binary Boarding', () => {
  it('calculates the seat ID', () => {
    expect(seatId('FBFBBFFRLR')).toBe(357);
    expect(seatId('BFFFBBFRRR')).toBe(567);
    expect(seatId('FFFBBBFRRR')).toBe(119);
    expect(seatId('BBFFBBFRLL')).toBe(820);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day05.txt')).toString();
    expect(solution.part1(input)).toBe(938);
    expect(solution.part2(input)).toBe(696);
  });
});
