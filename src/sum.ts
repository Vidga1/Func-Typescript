type SumFunction = {
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
