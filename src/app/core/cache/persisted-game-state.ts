import { Card } from "@core/models/card";

export interface PersistedGameState {
    valid: string;  // YYYY-MM-DD
    guesses: Card[];
}