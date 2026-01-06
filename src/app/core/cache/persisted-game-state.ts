import { Guess } from "@core/models/guess";

export interface PersistedGameState {
    valid: string;  // YYYY-MM-DD
    guesses: Guess[];
}