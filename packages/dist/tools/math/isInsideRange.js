export const isInsideRange = (value, range) => {
    const min = Math.min(...range);
    const max = Math.max(...range);
    return value >= min && value <= max;
};
//# sourceMappingURL=isInsideRange.js.map