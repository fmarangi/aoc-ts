import {afterSteps, energy, findAlignments, solution} from '../../src/2019/day12';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('December 12th, 2019', () => {
  it('calculates the energy of the moons', () => {
    expect(energy(afterSteps(10)([[-1, 0, 2, 0, 0, 0], [2, -10, -7, 0, 0, 0], [4, -8, 8, 0, 0, 0], [3, 5, -1, 0, 0, 0]]))).toBe(179);
    expect(energy(afterSteps(100)([[-8, -10, 0, 0, 0, 0], [5, 5, 10, 0, 0, 0], [2, -7, 3, 0, 0, 0], [9, -8, -3, 0, 0, 0]]))).toBe(1940);
  });

  it('the first state that exactly matches a previous state', () => {
    expect(findAlignments([[-1, 0, 2], [2, -10, -7], [4, -8, 8], [3, 5, -1]])).toBe(2772);
    expect(findAlignments([[-8, -10, 0], [5, 5, 10], [2, -7, 3], [9, -8, -3]])).toBe(4686774924);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2019/day12.txt')).toString();
    expect(solution.part1(input)).toBe(8287);
    expect(solution.part2(input)).toBe(528250271633772);
  });
});
