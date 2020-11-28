import {parseInput} from '../utils';
import Puzzle from '../puzzle';

export const deal = (stack: number[]): number[] => stack.reverse();

export const cut = (stack: number[], n: number): number[] => stack.slice(n).concat(stack.slice(0, n));

export function dealIncr(stack: number[], n: number): number[] {
  const length = stack.length;
  const newStack = Array(length);
  for (let i = 0; i < length; i++) {
    newStack[(i * n) % length] = stack[i];
  }
  return newStack;
}

export function shuffle(process: string, qty: number): number[] {
  return parseInput(process).reduce(function (stack, op): number[] {
    switch (true) {
      case op.startsWith('cut'):
        return cut(stack, Number(op.split('cut ')[1]));
      case op.startsWith('deal with increment'):
        return dealIncr(stack, Number(op.split('deal with increment ')[1]));
      default:
        return deal(stack);
    }
  }, Array.from(Array(qty).keys()));
}

export const solution: Puzzle<number> = {
  part1: (input: string): number => shuffle(input, 10007).indexOf(2019),
  part2: (input: string): number => 0,
};
