import { Guess } from "@core/models/guess";
import { PersistedGameState } from "./persisted-game-state";

export function restoreState(STORAGE_KEY: string): Guess[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw) as PersistedGameState;

        if (parsed.valid !== todayKey()) {
            localStorage.removeItem(STORAGE_KEY);
            return [];
        }

        return parsed.guesses
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }

    return [];
}

export function saveState(STORAGE_KEY: string, guesses: Guess[]): void {
    const state: PersistedGameState = {
        valid: todayKey(),
        guesses: guesses,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function todayKey(): string {
    return new Date().toISOString().slice(0, 10);
}