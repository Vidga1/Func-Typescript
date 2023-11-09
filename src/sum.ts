export type SumFunction = {
  (x?: number): SumFunction;
  valueOf(): number;
  toString(): string;
};

export function createSumFunction(previousSum: number = 0): SumFunction {
  function sumFunction(x: number = 0): SumFunction {
    return createSumFunction(previousSum + x);
  }

  sumFunction.valueOf = function valueOf(): number {
    return previousSum;
  };

  sumFunction.toString = function toString(): string {
    return previousSum.toString();
  };

  return sumFunction as unknown as SumFunction;
}

const sum: SumFunction = createSumFunction();

// Использование функции
console.log(sum()); // 0
const s = sum();
console.log(s(1)); // 1
console.log(s(1)(2)); // 3
console.log(s(3)(4)(5)); // 12
const s3 = sum(3);
console.log(s3(5)); // 8
console.log(s3(6)); // 9
