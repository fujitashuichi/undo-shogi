type RepetitionResult = {
    isRepetition: false;
} | {
    isRepetition: true;
    type: "DRAW";
} | {
    isRepetition: true;
    type: "SENTE_LOSE";
} | {
    isRepetition: true;
    type: "GOTE_LOSE";
};
export declare const checkRepetition: (actionsHash: string[]) => RepetitionResult;
export {};
//# sourceMappingURL=checkRepetition.d.ts.map