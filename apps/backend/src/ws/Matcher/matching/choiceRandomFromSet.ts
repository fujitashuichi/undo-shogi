import { webcrypto } from "node:crypto";

export const getRandomInt = (
  number: number
) => {
  const randomBuffer = new Uint32Array(1);
  (globalThis.crypto || webcrypto).getRandomValues(randomBuffer);
  const secureRandom = randomBuffer[0]! / (0xffffffff + 1);

  return Math.floor(secureRandom * number);
}
