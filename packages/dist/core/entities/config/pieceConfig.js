import { motionMap } from "./motions/motionMap.js";
const adjustVectors = (side, kind) => {
    const direction = side === "Sente" ? -1 : 1;
    const vectors = motionMap[kind].vectors;
    return vectors.map(vector => {
        return {
            dx: vector.dx * (direction * -1),
            dy: vector.dy * direction,
            infinity: vector.infinity
        };
    });
};
export const pieceConfig = (side, kind) => {
    return {
        motion: {
            vectors: adjustVectors(side, kind)
        }
    };
};
//# sourceMappingURL=pieceConfig.js.map