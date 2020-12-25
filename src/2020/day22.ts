import Puzzle from '../../src/puzzle';
import {parseInput, sum} from '../utils';

export const score = (cards: number[]): number => cards.map((c, i) => c * (cards.length - i)).reduce(sum);

export function playGame(a: number[], b: number[]): number[] {
  while (a.length && b.length) {
    const c = a.shift(), d = b.shift();
    c > d ? a.push(c, d) : b.push(d, c);
  }
  return a.length ? a : b;
}

export function playGameRecursive(one: number[], two: number[]): number[] {
  const hash = (...players: number[][]): string => players.map(p => p.join(',')).join(' vs ');

  const game = (a: number[], b: number[]): [number, number[]] => {
    const seen = new Set<string>();
    while (a.length && b.length) {
      const current = hash(a, b);
      if (seen.has(current)) {
        return [1, a];
      }

      seen.add(current);
      const c = a.shift(), d = b.shift();
      if (c <= a.length && d <= b.length) {
        const [winner] = game(a.slice(0, c), b.slice(0, d));
        winner > 0 ? a.push(c, d) : b.push(d, c);
        continue;
      }

      c > d ? a.push(c, d) : b.push(d, c);
    }

    return a.length ? [1, a] : [-1, b];
  };

  return game(one, two)[1];
}

const players = (input: string): number[][] => input.split("\n\n").map(p => parseInput(p).slice(1).map(Number));

export const solution: Puzzle<number> = {
  part1: (input: string): number => score(playGame.apply(null, players(input))),
  part2: (input: string): number => score(playGameRecursive.apply(null, players(input))),
};
