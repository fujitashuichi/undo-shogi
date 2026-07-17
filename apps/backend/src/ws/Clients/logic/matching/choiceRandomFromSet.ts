import { webcrypto } from "node:crypto";

export const choiceRandomFromArray = <T>(
  array: Array<T>
) => {
  const randomBuffer = new Uint32Array(1);
  (globalThis.crypto || webcrypto).getRandomValues(randomBuffer);
  const secureRandom = randomBuffer[0]! / (0xffffffff + 1);

  return array[Math.floor(secureRandom * array.length)];
}
