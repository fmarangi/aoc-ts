import Puzzle from '../puzzle';
import {parseInput} from '../utils';

export const validPassword = (policy: string, password: string): boolean => {
  const [times, letter] = policy.split(' ');
  const [from, to] = times.split('-').map(Number);
  const found = password.length - password.replace(new RegExp(letter, 'g'), '').length;
  return found >= from && found <= to;
};

export const validTobogganPassword = (policy: string, password: string): boolean => {
  const [pos, letter] = policy.split(' ');
  const [a, b] = pos.split('-').map(Number);
  return (password.charAt(a - 1) === letter) !== (password.charAt(b - 1) === letter);
};

const checkWith = (input: string, validator: any): number => parseInput(input).filter(p => validator(...p.split(': '))).length;

export const solution: Puzzle<number> = {
  part1: (input: string): number => checkWith(input, validPassword),
  part2: (input: string): number => checkWith(input, validTobogganPassword)
};
