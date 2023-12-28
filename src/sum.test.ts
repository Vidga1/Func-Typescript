import { createSumFunction } from "./sum";

describe("createSumFunction", () => {
  it("should correctly sum up values on sequential calls", () => {
    const sum = createSumFunction();
    expect(sum(1)(2)(3).valueOf()).toBe(6);
  });

  it("should handle calls without arguments", () => {
    const sum = createSumFunction();
    expect(sum().valueOf()).toBe(0);
    expect(sum(5)().valueOf()).toBe(5);
    expect(sum(3)(4)().valueOf()).toBe(7);
  });

  it("should correctly represent the sum as a string", () => {
    const sum = createSumFunction();
    expect(sum(1)(2)(3).toString()).toBe("6");
  });

  it("should start from provided initial value", () => {
    const sum = createSumFunction(10);
    expect(sum(5)(10).valueOf()).toBe(25);
  });
});
