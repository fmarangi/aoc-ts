import {playGame, playGameRecursive, score, solution} from '../../src/2020/day22';
import {readFileSync} from 'fs';
import {join} from 'path';

describe('Day 22: Crab Combat', () => {
  it('calculates the score', () => {
    expect(score([3, 2, 10, 6, 8, 5, 9, 4, 7, 1])).toBe(306);
  });

  it('plays the game', () => {
    expect(score(playGame([9, 2, 6, 3, 1], [5, 8, 4, 7, 10]))).toBe(306);
    expect(score(playGameRecursive([9, 2, 6, 3, 1], [5, 8, 4, 7, 10]))).toBe(291);
  });

  it('solves the puzzle', () => {
    const input = readFileSync(join(__dirname, '../../input/2020/day22.txt')).toString();
    expect(solution.part1(input)).toBe(33403);
    expect(solution.part2(input)).toBe(29177);
  });
});
