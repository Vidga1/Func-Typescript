import { curry } from "./curry"; // Предполагается, что функция curry экспортирована из файла curry.ts

describe("curry", () => {
  it("should correctly curry a function with all arguments provided at once", () => {
    const sum = (a: number, b: number, c: number) => a + b + c;
    const curriedSum = curry(sum);

    expect(curriedSum(1, 2, 3)).toBe(6);
  });

  it("should allow partial application of arguments", () => {
    const sum = (a: number, b: number, c: number) => a + b + c;
    const curriedSum = curry(sum);

    expect(curriedSum(1)(2)(3)).toBe(6);
  });

  it("should return a function when not all arguments are provided", () => {
    const sum = (a: number, b: number, c: number) => a + b + c;
    const curriedSum = curry(sum);

    expect(typeof curriedSum(1)).toBe("function");
  });

  // Тестирование с функцией большей арности
  it("should work with functions of more than three arguments", () => {
    const sum = (a: number, b: number, c: number, d: number, e: number) =>
      a + b + c + d + e;
    const curriedSum = curry(sum);

    expect(curriedSum(1, 2, 3, 4, 5)).toBe(15);
    expect(curriedSum(1)(2)(3)(4)(5)).toBe(15);
    expect(curriedSum(1, 2)(3, 4)(5)).toBe(15);
  });
});
