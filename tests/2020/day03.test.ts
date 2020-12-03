import {allSlopes, countTrees, solution} from '../../src/2020/day03';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('December 3rd, 2020', () => {
  it('counts the trees on the slope', () => {
    expect(countTrees(
      "..##.......\n" +
      "#...#...#..\n" +
      ".#....#..#.\n" +
      "..#.#...#.#\n" +
      ".#...##..#.\n" +
      "..#.##.....\n" +
      ".#.#.#....#\n" +
      ".#........#\n" +
      "#.##...#...\n" +
      "#...##....#\n" +
      ".#..#...#.#")).toBe(7);
  });

  it('counts the trees on all slopes', () => {
    expect(allSlopes(
      "..##.......\n" +
      "#...#...#..\n" +
      ".#....#..#.\n" +
      "..#.#...#.#\n" +
      ".#...##..#.\n" +
      "..#.##.....\n" +
      ".#.#.#....#\n" +
      ".#........#\n" +
      "#.##...#...\n" +
      "#...##....#\n" +
      ".#..#...#.#")).toBe(336);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day03.txt')).toString();
    expect(solution.part1(input)).toBe(280);
    expect(solution.part2(input)).toBe(4355551200);
  });
});
