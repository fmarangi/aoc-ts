export default interface Puzzle<R> {
  part1: (input: string) => R;
  part2: (input: string) => R;
}
