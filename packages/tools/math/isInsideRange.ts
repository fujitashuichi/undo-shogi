export const isInsideRange = (value: number, range: [number, number]): boolean => {
  const min = Math.min(...range);
  const max = Math.max(...range);

  return value >= min && value <= max;
}
