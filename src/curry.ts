type SameLength<T extends unknown[]> = Extract<
  { [K in keyof T]: unknown },
  unknown[]
>;

type Curry<P extends unknown[], R> = <T extends Partial<P>>(
  ...args: T
) => T extends P
  ? R
  : P extends [...SameLength<T>, ...infer S]
  ? S extends unknown[]
    ? Curry<S, R>
    : never
  : never;

export function curry<P extends unknown[], R>(
  fn: (...args: P) => R,
): Curry<P, R> {
  return function curried(...args: unknown[]): unknown {
    if (args.length >= fn.length) {
      return fn(...(args as P));
    }
    return (...args2: unknown[]) => curried(...args, ...args2);
  } as Curry<P, R>;
}
