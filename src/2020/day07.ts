import Puzzle from '../puzzle';

type BagContent = { [type: string]: number };
type BagTypes = { [type: string]: BagContent };

const parseBagContent = (content: string): BagContent =>
  Array.from(content.matchAll(/(\d) (.*?) bags?/g)).reduce((res, b) => ({...res, [b[2]]: Number(b[1])}), {});

const parseInput = (input: string): BagTypes =>
  Array.from(input.trim().matchAll(/(.*?) bags contain ([^.]+)./g))
    .reduce((res, m) => ({...res, [m[1]]: parseBagContent(m[2])}), {});

const findAll = (bags: BagTypes, type: string): string[] => {
  const finder = (type: string): string[] => Object.entries(bags).filter(c => c[1].hasOwnProperty(type)).map(c => c[0]);
  const types = finder(type);
  return types.reduce((a, t) => [...a, ...findAll(bags, t)], types);
}

const countAllBags = (bags: BagTypes, type: string): number =>
  Object.entries(bags[type] ?? {})
    .reduce((tot: number, [what, qty]: [string, number]): number => tot + qty * countAllBags(bags, what), 1);

export const solution: Puzzle<number> = {
  part1: (input: string): number => (new Set(findAll(parseInput(input), 'shiny gold'))).size,
  part2: (input: string): number => countAllBags(parseInput(input), 'shiny gold') - 1,
}
