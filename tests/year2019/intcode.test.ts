import {parseProgram} from "../../src/2019/intcode";

describe('Intcode', () => {
  it('parses the program', () => {
    expect(parseProgram('1,9,10,3,2,3,11,0,99,30,40,50')).toStrictEqual([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]);
  });
});
