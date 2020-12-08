import Puzzle from '../puzzle';
import {sum} from '../utils';

type Chemical = [number, { [chemical: string]: number }];
type Reactions = { [chemical: string]: Chemical };

export const parseInput = (input: string): Reactions =>
  input.trim().split("\n").reduce((reactions: object, line: string): object => {
    const [fromC, to] = line.split(' => ');
    const [qty, chemical] = to.split(' ');
    const from = fromC.split(', ').map(c => c.split(' ')).reduce((f, c) => ({...f, [c[1]]: Number(c[0])}), {});
    return {...reactions, [chemical]: [Number(qty), from]};
  }, {});

export const getOreQuantity = (reactions: Reactions, fuelQty: number = 1): number => {
  const surplus: { [chemical: string]: number } = {};
  const ores = (chemical: string, req: number): number => {
    if (chemical === 'ORE') return req;

    const [qty, from] = reactions[chemical];
    const toProduce = req - (surplus[chemical] ?? 0);
    const times = Math.ceil(toProduce / qty);
    const result = Object.entries(from).map(c => ores(c[0], c[1] * times)).reduce(sum);
    surplus[chemical] = times * qty - toProduce;
    return result;
  };
  return ores('FUEL', fuelQty);
}

export const maxFuelAmount = (reactions: Reactions, oreQty: number = 1000000000000): number => {
  const orePerFuel = getOreQuantity(reactions);
  let min = Math.ceil(oreQty / orePerFuel);
  let max = min * 3;
  while (max - min > 1) {
    let newValue = Math.floor((min + max) / 2);
    if (getOreQuantity(reactions, newValue) > 1000000000000) {
      max = newValue;
    } else {
      min = newValue;
    }
  }
  return min;
};

export const solution: Puzzle<number> = {
  part1: (input: string): number => getOreQuantity(parseInput(input)),
  part2: (input: string): number => maxFuelAmount(parseInput(input)),
};
