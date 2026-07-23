import { convertToShogiError } from "./ShogiError.js";

export const shogiErrorHandler = (func: () => any) => {
  try {
    return func()
  } catch (err) {
    throw convertToShogiError(err);
  }
}
