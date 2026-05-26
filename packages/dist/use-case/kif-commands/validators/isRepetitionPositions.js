export const isRepetitionPositions = (actionsHash) => {
    const counts = actionsHash.reduce((acc, hash) => {
        acc[hash] = (acc[hash] || 0) + 1;
        return acc;
    }, {});
    const entries = Object.entries(counts);
    return entries.some(([_hash, count]) => count >= 4);
};
//# sourceMappingURL=isRepetitionPositions.js.map