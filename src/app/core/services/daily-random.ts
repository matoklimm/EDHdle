export function dailyIndex(length: number, dayKey: string): number {
    const hash = hashString(dayKey);
    return hash % length;
}

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

export function getTodayKey(): string {
    return new Date().toISOString().slice(0, 10);
}

export function getYesterdayKey(): string {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
}