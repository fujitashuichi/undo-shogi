type RepetitionResult =
  | { isRepetition: false }
  | { isRepetition: true; type: "DRAW" }
  | { isRepetition: true; type: "SENTE_LOSE" }
  | { isRepetition: true; type: "GOTE_LOSE" };

export const checkRepetition = (actionsHash: string[]): RepetitionResult => {
  const hashPositions: Record<string, number[]> = {};

  actionsHash.forEach((hash, index) => {
    if (!hashPositions[hash]) {
      hashPositions[hash] = [];
    }
    hashPositions[hash].push(index);
  });


  const targetHash = Object.keys(hashPositions).find(
    hash => hashPositions[hash] && hashPositions[hash].length >= 4
  );

  if (!targetHash) {
    return {
      isRepetition: false
    };
  }


  const indices = hashPositions[targetHash];
  const firstIndex = indices ? indices[0] : undefined;
  const fourthIndex = indices ? indices[3] : undefined;

  if (firstIndex === undefined || fourthIndex === undefined) {
    throw new Error("unexpected error: 配列が破損しています");
  }


  const loopIntervalHashes = actionsHash.slice(firstIndex + 1, fourthIndex + 1);

  const isSenteAllCheck = loopIntervalHashes.every(hash => {
    if (hash.includes("currentSide=Gote")) {
      return hash.includes("checked=Gote");
    }
    return true;
  });

  const isGoteAllCheck = loopIntervalHashes.every(hash => {
    if (hash.includes("currentSide=Sente")) {
      return hash.includes("checked=Sente");
    }
    return true;
  });


  if (isSenteAllCheck && !isGoteAllCheck) {
    return {
      isRepetition: true,
      type: "SENTE_LOSE"
    };
  }
  if (isGoteAllCheck && !isSenteAllCheck) {
    return {
      isRepetition: true,
      type: "GOTE_LOSE"
    };
  }

  return {
    isRepetition: true,
    type: "DRAW"
  };
};
