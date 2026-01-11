import { HttpClient } from '@angular/common/http';
import { Signal, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameConfig } from '@core/services/game-config';
import { GameService } from './game-service';
import { Guess } from '@core/models/guess';
import { Card } from '@core/models/card';
import { seededShuffle, getTodayKey, hashString } from '@shared/daily-random';
import { restoreState, saveState } from '@core/cache/storage-functions';

export abstract class BaseGameService implements GameService {
    protected http = inject(HttpClient);

    private _dayKey = signal(getTodayKey());

    protected _guesses = signal<Guess[]>([]);
    readonly guesses = this._guesses.asReadonly();

    protected _allCards: Signal<Card[]>;
    readonly cards: Signal<Card[]>;

    protected _target: Signal<Card | null>;
    readonly target: Signal<Card | null>;

    readonly isGameWon = computed(() =>
        this._guesses().some(g => g.isCorrect)
    );

    readonly guessedNames = computed(() =>
        this._guesses().map(g => g.card.name)
    );

    constructor(protected config: GameConfig) {
        this._allCards = toSignal(
            this.http.get<Card[]>(config.dataUrl),
            { initialValue: [] }
        );

        this.cards = this._allCards;

        this._target = computed<Card | null>(() => {
            const cards = this._allCards();
            const day = this._dayKey();

            if (!cards.length) return null;

            const seed = hashString(`${day}:${this.config.modeKey}`);
            return seededShuffle(cards, seed)[0];
        });

        this.target = this._target;

        this._guesses.set(restoreState(config.storageKey));

        effect(() => {
            saveState(config.storageKey, this._guesses());
        });

        this.startDailyTicker();
    }

    submitGuess(cardName: string): void {
        if (this.isGameWon()) return;

        const card = this._allCards().find(c => c.name === cardName);
        const target = this._target();

        if (!card || !target) return;

        this._guesses.update(prev => [
            { card, isCorrect: card.name === target.name },
            ...prev,
        ]);
    }

    /**
     * checking every minute today has changed and if so, update the signal
     */
    private startDailyTicker(): void {
        setInterval(() => {
            const today = getTodayKey();
            if (today !== this._dayKey()) {
                this._dayKey.update((_) => today);
            }
        }, 60_000);
    }
}
