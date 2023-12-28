import { spiral } from "./spiral";

describe("spiral", () => {
  it("should return an empty array when given an empty matrix", () => {
    expect(spiral([])).toEqual([]);
  });

  it("should correctly unravel a 1xN matrix", () => {
    expect(spiral([[1, 2, 3, 4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly unravel a Nx1 matrix", () => {
    expect(spiral([[1], [2], [3], [4], [5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it("should correctly unravel a 2x2 matrix", () => {
    expect(
      spiral([
        [1, 2],
        [4, 3],
      ]),
    ).toEqual([1, 2, 3, 4]);
  });

  it("should correctly unravel a 3x3 matrix", () => {
    expect(
      spiral([
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5],
      ]),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("should correctly unravel a 4x5 matrix", () => {
    expect(
      spiral([
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
      ]),
    ).toEqual([
      0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11,
    ]);
  });
});
