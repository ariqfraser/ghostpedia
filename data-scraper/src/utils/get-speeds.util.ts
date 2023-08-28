export const getSpeeds = (speedStr: string): number[] => {
    if (speedStr === '') {
        return [0];
    }

    const cleaned = speedStr.replace(/[^\d.]/g, ' ');
    const subs = cleaned.split(' ');

    const speeds = subs.reduce((speeds, speedStr) => {
        if (!speedStr.trim()) return speeds;

        speeds.push(Number.parseFloat(speedStr));

        return speeds;
    }, [] as number[]);

    return speeds.sort();
};
