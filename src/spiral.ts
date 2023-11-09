export function spiral(matrix: number[][]): number[] {
    const result: number[] = [];
    while (matrix.length) {

      result.push(...matrix.shift()!);
 
      matrix.forEach(row => result.push(row.pop()!));

      matrix.reverse().forEach(row => row.reverse());
    }
    return result.filter(n => n !== undefined);
  }
  
  const spiralOutput = spiral([
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
  ]);
  console.log(spiralOutput); // [0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11]
  