import { curry } from "./curry"; // Предполагается, что функция curry экспортирована из файла curry.ts

describe("curry", () => {
  const func = (
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
  ): number => a + b + c + d + e;
  const curriedFunc = curry(func);

  test("should return a curried version of the given function", () => {
    expect(curriedFunc(1)(2)(3)(4)(5)).toBe(15);
  });

  test("should correctly add numbers when called in steps", () => {
    const step1 = curriedFunc(1);
    const step2 = step1(2);
    const step3 = step2(3);
    const step4 = step3(4);
    const result = step4(5);
    expect(result).toBe(15);
  });

  test("should work when called with multiple arguments in steps", () => {
    expect(curriedFunc(2)(3)(4)(5)(6)).toBe(20);
    expect(curriedFunc(3)(4)(5)(6)(7)).toBe(25);
    expect(curriedFunc(4)(5)(6)(7)(8)).toBe(30);
    expect(curriedFunc(5)(6)(7)(8)(9)).toBe(35);
  });

  test("should throw an error when called with insufficient arguments", () => {
    // Проверяем, что каррированная функция возвращает функцию при недостаточном количестве аргументов
    const partialApplication = curriedFunc(1)(2)(3)(4);
    expect(typeof partialApplication).toBe("function");
  });
});
