export function semverSort(versions: string[]): string[] {
  // Вспомогательная функция для разделения версии на числовые сегменты
  const splitVersion = (version: string): number[] =>
    version.split(".").map((segment) => parseInt(segment, 10) || 0);

  // Вспомогательная функция для сравнения двух версий
  const compareVersions = (v1: string, v2: string): number => {
    const v1Segments = splitVersion(v1);
    const v2Segments = splitVersion(v2);

    for (let i = 0; i < Math.max(v1Segments.length, v2Segments.length); i++) {
      const num1 = v1Segments[i] || 0;
      const num2 = v2Segments[i] || 0;

      if (num1 !== num2) {
        return num1 - num2;
      }
    }

    return 0;
  };

  // Создаем копию массива перед сортировкой
  return [...versions].sort(compareVersions);
}

// Использование функции с новой реализацией
const versions = [
  "1.0.5",
  "2.5.0",
  "0.12.0",
  "1",
  "1.23.45",
  "1.4.50",
  "1.2.3.4.5.6.7",
];
const sortedVersions = semverSort(versions);
console.log(sortedVersions);
console.log(versions);
