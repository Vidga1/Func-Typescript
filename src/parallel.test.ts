/* eslint-disable no-promise-executor-return */
import { Parallel } from "./parallel";

describe("Parallel", () => {
  it("should execute all jobs and return results in the original order", async () => {
    const runner = new Parallel(2);
    const mockJobs = [
      () => new Promise((resolve) => setTimeout(() => resolve(1), 10)),
      () => new Promise((resolve) => setTimeout(() => resolve(2), 20)),
      () => new Promise((resolve) => setTimeout(() => resolve(3), 30)),
      () => new Promise((resolve) => setTimeout(() => resolve(4), 40)),
    ];

    const results = await runner.jobs(...mockJobs);
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it("should handle more jobs than the max concurrency", async () => {
    const runner = new Parallel(2); // maxConcurrentJobs is 2
    const mockJobs = [
      () => new Promise((resolve) => setTimeout(() => resolve("a"), 50)),
      () => new Promise((resolve) => setTimeout(() => resolve("b"), 20)),
      () => new Promise((resolve) => setTimeout(() => resolve("c"), 10)),
      () => new Promise((resolve) => setTimeout(() => resolve("d"), 30)),
    ];

    const results = await runner.jobs(...mockJobs);
    expect(results).toEqual(["a", "b", "c", "d"]);
  });

  it("should not run more jobs in parallel than the limit", async () => {
    const runner = new Parallel(2);
    let concurrentJobs = 0;
    let maxConcurrentJobs = 0;

    const trackConcurrency = (): Promise<void> =>
      new Promise((resolve) => {
        concurrentJobs++;
        maxConcurrentJobs = Math.max(maxConcurrentJobs, concurrentJobs);
        setTimeout(() => {
          concurrentJobs--;
          resolve();
        }, 10);
      });

    const mockJobs = [
      trackConcurrency,
      trackConcurrency,
      trackConcurrency,
      trackConcurrency,
    ];

    await runner.jobs(...mockJobs);
    expect(maxConcurrentJobs).toBe(2);
  });

  it("should return results in the correct order regardless of completion time", async () => {
    const runner = new Parallel(3);
    const mockJobs = [
      () => new Promise((resolve) => setTimeout(() => resolve("slow"), 100)),
      () => new Promise((resolve) => setTimeout(() => resolve("fast"), 10)),
      () => new Promise((resolve) => setTimeout(() => resolve("medium"), 50)),
    ];

    const results = await runner.jobs(...mockJobs);
    expect(results).toEqual(["slow", "fast", "medium"]);
  });
});
