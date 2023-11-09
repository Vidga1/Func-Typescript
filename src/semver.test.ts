import { semverSort } from "./semver";

describe("semverSort", () => {
  test("should correctly sort an array of semver strings with three segments", () => {
    const versions = ["1.0.5", "2.5.0", "0.12.0"];
    const expected = ["0.12.0", "1.0.5", "2.5.0"];
    expect(semverSort(versions)).toEqual(expected);
  });

  test("should correctly sort an array of semver strings with varying segments", () => {
    const versions = ["1.0.5", "2.5", "0.12.0", "1", "1.23.45", "1.4.50"];
    const expected = ["0.12.0", "1", "1.0.5", "1.4.50", "1.23.45", "2.5"];
    expect(semverSort(versions)).toEqual(expected);
  });

  test("should handle single segment versions", () => {
    const versions = ["1", "10", "2"];
    const expected = ["1", "2", "10"];
    expect(semverSort(versions)).toEqual(expected);
  });

  test("should not modify the input array", () => {
    const versions = ["1.0.1", "1.0", "1"];
    const copyOfVersions = [...versions]; // Создаем копию до сортировки
    const sortedVersions = semverSort(versions); // Получаем отсортированный массив, не изменяя исходный
    expect(versions).toEqual(copyOfVersions); // Проверяем, что исходный массив не изменен
    expect(sortedVersions).not.toEqual(versions); // Проверяем, что результат сортировки отличается от исходного
  });
});
