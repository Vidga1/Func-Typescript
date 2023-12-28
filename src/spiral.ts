export function spiral(matrix: number[][]): number[] {
  const result: number[] = [];
  while (matrix.length) {
    result.push(...matrix.shift()!);

    matrix.forEach((row) => result.push(row.pop()!));

    matrix.reverse().forEach((row) => row.reverse());
  }
  return result.filter((n) => n !== undefined);
}
