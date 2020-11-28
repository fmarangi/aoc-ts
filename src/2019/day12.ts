import {lcm, parseInput, prd, sum} from '../utils';
import Puzzle from '../puzzle';

const applyGravity = (moons: number[][], dim: number = 3): number[][] => {
  for (let i = 0; i < moons.length - 1; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      for (let k = 0; k < dim; k++) {
        moons[i][k + dim] += Math.sign(moons[j][k] - moons[i][k]);
        moons[j][k + dim] += Math.sign(moons[i][k] - moons[j][k]);
      }
    }
  }
  return moons;
};

const applyVelocity = (moons: number[][], dim: number = 3): number[][] => {
  return applyGravity(moons, dim).map(moon => {
    for (let i = 0; i < dim; i++) moon[i] += moon[i + dim];
    return moon;
  });
};

export const afterSteps = (steps: number) => (moons: number[][]): number[][] => {
  return Array.from(Array(steps).keys()).reduce(moons => applyVelocity(moons), moons);
}

export const energy = (moons: number[][]): number =>
  moons
    .map(moon => moon.map(Math.abs))
    .map(moon => [moon.slice(0, 3), moon.slice(3)].map(p => p.reduce(sum)).reduce(prd))
    .reduce(sum);

const parseLine = (line: string): number[] => Array.from(line.matchAll(/-?\d+/g)).map(m => Number(m[0])).concat([0, 0, 0]);

function findAlignment(moons: number[]): number {
  const hash = (moons: number[][]): string => [].concat(...moons).join(' ');
  let positions = moons.map(m => [m, 0]);
  let state = hash(positions);
  const previousStates = new Set<string>();

  while (!previousStates.has(state)) {
    previousStates.add(state);
    positions = applyVelocity(positions, 1);
    state = hash(positions);
  }

  return previousStates.size;
}

export function findAlignments(moons: number[][]): number {
  return [0, 1, 2].map(x => moons.map(m => m[x])).map(findAlignment).reduce(lcm);
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => energy(afterSteps(1000)(parseInput(input).map(parseLine))),
  part2: (input: string): number => findAlignments(parseInput(input).map(parseLine))
};
