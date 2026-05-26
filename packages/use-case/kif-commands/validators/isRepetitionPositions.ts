export const isRepetitionPositions = (actionsHash: string[]): boolean => {
  const counts = actionsHash.reduce((acc, hash): Record<string, number> => {
    acc[hash] = (acc[hash] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(counts)

  return entries.some(([_hash, count]) => count >= 4);
}
