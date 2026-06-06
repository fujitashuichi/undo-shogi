import { convertToDomainError } from "./domainError.js";

export const domainErrorHandler = (func: () => any) => {
  try {
    return func()
  } catch (err) {
    throw convertToDomainError(err);
  }
}
