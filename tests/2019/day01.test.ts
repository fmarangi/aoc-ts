import {fuel, solution, totalFuel} from '../../src/2019/day01';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('December 1st, 2019', () => {
  it('calculates the fuel required', () => {
    expect(fuel(12)).toBe(2);
    expect(fuel(14)).toBe(2);
    expect(fuel(1969)).toBe(654);
    expect(fuel(100756)).toBe(33583);
  });

  it('calculates the total fuel required', () => {
    expect(totalFuel(14)).toBe(2);
    expect(totalFuel(1969)).toBe(966);
    expect(totalFuel(100756)).toBe(50346);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day01.txt')).toString();
    expect(solution.part1(input)).toBe(3381405);
    expect(solution.part2(input)).toBe(5069241);
  });
});
