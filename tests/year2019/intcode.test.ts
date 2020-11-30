import {getModes, parseProgram, runProgram} from '../../src/2019/intcode';

describe('Intcode', () => {
  it('parses the program', () => {
    expect(parseProgram('1,9,10,3,2,3,11,0,99,30,40,50')).toStrictEqual([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  it('calculates the parameter modes', () => {
    expect(getModes(1002)).toStrictEqual([0, 1, 0]);
  });

  it('runs the program including new features', () => {
    expect(runProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [8]).pop()).toBe(1);
    expect(runProgram([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], [7]).pop()).toBe(0);

    expect(runProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [7]).pop()).toBe(1);
    expect(runProgram([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], [8]).pop()).toBe(0);

    expect(runProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], [8]).pop()).toBe(1);
    expect(runProgram([3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9], [0]).pop()).toBe(0);

    expect(runProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [0]).pop()).toBe(0);
    expect(runProgram([3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1], [7]).pop()).toBe(1);

    const program = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
      1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
      999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];
    expect(runProgram(program, [7]).pop()).toBe(999);
    expect(runProgram(program, [8]).pop()).toBe(1000);
    expect(runProgram(program, [9]).pop()).toBe(1001);
  })
});
