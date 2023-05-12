import Puzzle from '../puzzle';
import { parseInput } from '../utils';

type Direction = 'forward' | 'up' | 'down';
type Command = [Direction, number];

export const solution: Puzzle<number> = {
  part1(input: string): number {
    return parse(input)
      .reduce(
        ([h, d], [dir, v]) => {
          switch (dir) {
            case 'forward':
              return [h + v, d];
            case 'up':
              return [h, d - v];
            case 'down':
              return [h, d + v];
          }
        },
        [0, 0]
      )
      .reduce((a, b) => a * b);
  },

  part2(input: string): number {
    const [h, d] = parse(input).reduce(
      ([h, d, a], [dir, v]) => {
        switch (dir) {
          case 'forward':
            return [h + v, d + a * v, a];
          case 'up':
            return [h, d, a - v];
          case 'down':
            return [h, d, a + v];
        }
      },
      [0, 0, 0]
    );
    return h * d;
  },
};

function parse(input: string): Array<Command> {
  return parseInput(input).map(l => {
    const [dir, value] = l.split(' ');
    return [dir as Direction, parseInt(value)];
  });
}
