export const MAX_DEGREES = 360;
export const HALF_DEGREES = MAX_DEGREES / 2;

export const normalizeCap = (cap: number) => cap % MAX_DEGREES;
export const invertCap = (cap: number) => normalizeCap(cap + HALF_DEGREES);

export const nextRandomCap = (cap: number) => {
    const MARGIN = 20;
    const invertedCap = invertCap(cap);
    if (Math.random() > 0.5) {
        return normalizeCap(Math.floor(Math.random() * (HALF_DEGREES - MARGIN)) + invertedCap + MARGIN);
    } else {
        return normalizeCap(Math.floor(Math.random() * (HALF_DEGREES - MARGIN)) + cap);
    }
};

export const isDirectionCorrect = (currentCap: number, nextCap: number, isLeft: boolean) => {
    const leftTurn = normalizeCap(nextCap - currentCap + MAX_DEGREES) > HALF_DEGREES;
    return (leftTurn && !isLeft) || (!leftTurn && isLeft) ? false : true;
};
