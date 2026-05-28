export const checkRepetition = (actionsHash) => {
    const hashPositions = {};
    actionsHash.forEach((hash, index) => {
        if (!hashPositions[hash]) {
            hashPositions[hash] = [];
        }
        hashPositions[hash].push(index);
    });
    const targetHash = Object.keys(hashPositions).find(hash => hashPositions[hash] && hashPositions[hash].length >= 4);
    if (!targetHash) {
        return {
            isRepetition: false
        };
    }
    const indices = hashPositions[targetHash];
    const firstIndex = indices ? indices[0] ?? 0 : 0;
    const fourthIndex = indices ? indices[3] ?? 0 : 0;
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
//# sourceMappingURL=checkRepetition.js.map