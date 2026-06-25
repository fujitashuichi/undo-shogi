import { expect } from "vitest";


export const vitest_checkArray = {
  sameArray: (array_1: any[], array_2: any[]) => {
    expect(array_1).toEqual(array_2);
    expect(array_2).toEqual(array_1);
  },

  containingEachOther: (array_1: any[], array_2: any[]) => {
    expect(array_1).toEqual(
      expect.arrayContaining(array_2)
    );
    expect(array_2).toEqual(
      expect.arrayContaining(array_1)
    );
  }
}
