export const choiceRandomFromSet = <T>(
  set: Set<T>
) => {
  const array = [...set];
  return array[Math.floor(Math.random() * array.length)];
}
