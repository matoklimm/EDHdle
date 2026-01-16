import { Card } from "@core/models/card";
import { PersistedGameState } from "./persisted-game-state";
import { getTodayKey } from "@app/shared/daily-random";

export function restoreState(STORAGE_KEY: string): Card[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw) as PersistedGameState;

        if (parsed.valid !== getTodayKey()) {
            localStorage.removeItem(STORAGE_KEY);
            return [];
        }

        return parsed.guesses
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }

    return [];
}

export function saveState(STORAGE_KEY: string, guesses: Card[]): void {
    const state: PersistedGameState = {
        valid: getTodayKey(),
        guesses: guesses,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}