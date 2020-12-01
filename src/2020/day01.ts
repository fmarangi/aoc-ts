import Puzzle from '../puzzle';
import {parseInput} from '../utils';

export const solution: Puzzle<number> = {
  part1(input: string): number {
    const expenses = parseInput(input).map(Number);
    expenses.sort();
    for (let i = 0; i < expenses.length; i++) {
      for (let j = i + 1; j < expenses.length; j++) {
        if (expenses[i] + expenses[j] === 2020) return expenses[i] * expenses[j];
      }
    }
    return -1;
  },

  part2(input: string): number {
    const expenses = parseInput(input).map(Number);
    expenses.sort();
    for (let i = 0; i < expenses.length; i++) {
      for (let j = i + 1; j < expenses.length; j++) {
        for (let k = j + 1; k < expenses.length; k++) {
          if (expenses[i] + expenses[j] + expenses[k] === 2020) return expenses[i] * expenses[j] * expenses[k];
        }
      }
    }
    return -1;
  }
}
