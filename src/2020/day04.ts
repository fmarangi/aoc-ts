import Puzzle from '../puzzle';
import {between, parseInput} from '../utils';

const validationRules = {
  byr: (value: string): boolean => between(value, 1920, 2002),
  iyr: (value: string): boolean => between(value, 2010, 2020),
  eyr: (value: string): boolean => between(value, 2020, 2030),
  hgt: (value: string): boolean => {
    const [, height, unit] = value.match(/^(\d+)(cm|in)$/) || [];
    return unit === 'cm' ? between(height, 150, 193) : between(height, 59, 76);
  },
  hcl: (value: string): boolean => /^#[0-9a-f]{6}$/.test(value),
  ecl: (value: string): boolean => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value),
  pid: (value: string): boolean => /^\d{9}$/.test(value),
  cid: (value: string): boolean => true,
};

const parsePasswordData = (passport: string): object =>
  Array.from(passport.matchAll(/(byr|iyr|eyr|hgt|hcl|ecl|pid|cid):([^\s$]+)/g))
    .reduce((data: object, m: RegExpMatchArray): object => ({...data, [m[1]]: m[2]}), {cid: ''})

const hasAllData = (passport: object): boolean => Object.keys(passport).length === 8;

const isValid = (passport: object): boolean =>
  Object.entries(passport)
    .reduce((res: boolean, [key, value]): boolean => res && (validationRules[key] as any)(value), hasAllData(passport));

export const countValid = (input: string): number => {
  return parseInput(input, "\n\n").map(parsePasswordData).filter(hasAllData).length;
};

export const countValidValues = (input: string): number => {
  return parseInput(input, "\n\n").map(parsePasswordData).filter(isValid).length;
};

export const solution: Puzzle<number> = {
  part1: (input: string): number => countValid(input),
  part2: (input: string): number => countValidValues(input),
}
