// Определяем тип для функции с пятью параметрами
type FuncWithFiveArgs<T1, T2, T3, T4, T5, R> = (
  a: T1,
  b: T2,
  c: T3,
  d: T4,
  e: T5,
) => R;

// Определяем тип для каррированной функции
type CurriedFunction<T1, T2, T3, T4, T5, R> = (
  a: T1,
) => (b: T2) => (c: T3) => (d: T4) => (e: T5) => R;

export function curry<T1, T2, T3, T4, T5, R>(
  func: FuncWithFiveArgs<T1, T2, T3, T4, T5, R>,
): CurriedFunction<T1, T2, T3, T4, T5, R> {
  return function first(a: T1) {
    return function second(b: T2) {
      return function third(c: T3) {
        return function fourth(d: T4) {
          return function fifth(e: T5) {
            return func(a, b, c, d, e);
          };
        };
      };
    };
  };
}

// Пример использования
const func: FuncWithFiveArgs<number, number, number, number, number, number> = (
  a,
  b,
  c,
  d,
  e,
) => a + b + c + d + e;
const hof: CurriedFunction<number, number, number, number, number, number> =
  curry(func);

console.log(hof(1)(2)(3)(4)(5)); // 15
console.log(hof(2)(3)(4)(5)(6)); // 20
console.log(hof(3)(4)(5)(6)(7)); // 25
console.log(hof(4)(5)(6)(7)(8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35
