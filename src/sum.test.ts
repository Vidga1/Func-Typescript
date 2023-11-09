import { createSumFunction, SumFunction } from "./sum";

describe("createSumFunction", () => {
  test("should return 0 when no arguments are passed", () => {
    const sum: SumFunction = createSumFunction();
    expect(sum.valueOf()).toBe(0);
  });

  test("should correctly add numbers", () => {
    const s = createSumFunction();
    expect(s(1).valueOf()).toBe(1);
    expect(s(1)(2).valueOf()).toBe(3);
    expect(s(3)(4)(5).valueOf()).toBe(12);
  });

  test("should correctly handle chaining of returned functions", () => {
    const s3 = createSumFunction(3);
    expect(s3(5).valueOf()).toBe(8);
    expect(s3(6).valueOf()).toBe(9);
  });

  test("toString should return the sum as a string", () => {
    const s = createSumFunction();
    expect(s(1)(2).toString()).toBe("3");
    expect(s(3)(4)(5).toString()).toBe("12");
  });
});
