import { Card } from "@core/models/card";

export function seededShuffle(array: Card[], seed: number): Card[] {
    const result = [...array];
    let m = result.length;
    let i: number;

    function random() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }

    while (m) {
        i = Math.floor(random() * m--);
        [result[m], result[i]] = [result[i], result[m]];
    }

    return result;
}

export function hashString(str: string): number {
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