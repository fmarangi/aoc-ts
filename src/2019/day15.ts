import Puzzle from '../puzzle';
import {parseProgram, runProgram} from './intcode';

const enum Direction {N = 1, S, W, E}

function currentPosition(steps: number[]): number {
  const offsets = {[Direction.N]: -45, [Direction.S]: 45, [Direction.W]: -1, [Direction.E]: 1};
  return steps.reduce((t, s) => t + offsets[s], 1058);
}

function getGrid(intcode: number[]): string {
  const all: { [pos: number]: number } = {};
  const next = (steps: number[], seen: Set<any>): [number[], number, number][] =>
    [Direction.N, Direction.S, Direction.E, Direction.W]
      .map((n: number): number[] => [...steps, n])
      .map((s: number[]): [number[], number, number] => [s, currentPosition(s), runProgram(intcode, s).pop()])
      .filter(s => !seen.has(s[1]) && !all.hasOwnProperty(s[1]));

  const queue: [number[], Set<number>][] = [[[], new Set<number>()]];
  while (queue.length) {
    const [steps, seen] = queue.shift();
    for (let [nextSteps, position, result] of next(steps, seen)) {
      all[position] = result;
      if (result !== 0) queue.push([nextSteps, new Set(seen).add(position)]);
    }
  }

  let grid = '';
  for (let i = 0; i < 2025; i++) {
    grid += (['#', '.', 'O'])[all[i] ?? 0];
    if ((i + 1) % 45 === 0) grid += "\n";
  }

  return grid;
}

function fillWithOxygen(grid: string): number {
  const start = grid.indexOf('O'), row = grid.indexOf("\n") + 1, seen: Set<number> = new Set([start]);
  const next = (pos: number): number[] =>
    [1, -1, row, -row].map(o => o + pos).filter(p => grid.charAt(p) !== '#' && !seen.has(p));

  let minutes = -1, from = [start];
  while (from.length) {
    from = from.reduce((f, p) => [...f, ...next(p)], []);
    from.forEach(p => seen.add(p));
    minutes++;
  }

  return minutes;
}

function findShortestPath(intcode: number[]): number[] {
  const next = (steps: number[], seen: Set<any>): [number[], number, number][] =>
    [Direction.N, Direction.S, Direction.E, Direction.W]
      .map((n: number): number[] => [...steps, n])
      .map((s: number[]): [number[], number, number] => [s, currentPosition(s), runProgram(intcode, s).pop()])
      .filter(s => !!s[2] && !seen.has(s[1]));

  const queue: [number[], Set<number>][] = [[[], new Set<number>()]];
  while (queue.length) {
    const [steps, seen] = queue.shift();
    for (let [nextSteps, position, result] of next(steps, seen)) {
      if (result === 2) return nextSteps;
      queue.push([nextSteps, new Set(seen).add(position)]);
    }
  }
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => findShortestPath(parseProgram(input)).length,
  part2: (input: string): number => fillWithOxygen(getGrid(parseProgram(input)))
}
