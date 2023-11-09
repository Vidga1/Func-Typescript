type Job = () => Promise<unknown>;

export class Parallel {
  private maxConcurrentJobs: number;

  private currentJobsCount: number = 0;

  private jobQueue: [Job, number][] = [];

  private results: unknown[] = [];

  private resolveAll: ((results: unknown[]) => void) | null = null;

  constructor(maxConcurrentJobs: number) {
    this.maxConcurrentJobs = maxConcurrentJobs;
  }

  private async runJob(job: Job, index: number) {
    this.currentJobsCount++;
    this.results[index] = await job();
    this.currentJobsCount--;
    this.runNextJobs();
  }

  private runNextJobs() {
    while (
      this.currentJobsCount < this.maxConcurrentJobs &&
      this.jobQueue.length > 0
    ) {
      const [nextJob, nextJobIndex] = this.jobQueue.shift()!;
      this.runJob(nextJob, nextJobIndex);
    }

    if (
      this.currentJobsCount === 0 &&
      this.jobQueue.length === 0 &&
      this.resolveAll
    ) {
      this.resolveAll(this.results);
    }
  }

  public async jobs(...jobs: Job[]): Promise<unknown[]> {
    this.jobQueue = jobs.map((job, index) => [job, index]);
    this.results = new Array(jobs.length);
    return new Promise((resolve) => {
      this.resolveAll = resolve;
      this.runNextJobs();
    });
  }
}

const runner = new Parallel(2);
(async () => {
  console.log(
    await runner.jobs(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(1), 10);
        }),
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(2), 50);
        }),
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(3), 20);
        }),
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(4), 90);
        }),
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(5), 30);
        }),
    ),
  );
})();
