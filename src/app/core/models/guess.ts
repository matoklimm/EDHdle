import { Card } from "./card";

export interface Guess {
    card: Card;
    isCorrect: boolean;
}