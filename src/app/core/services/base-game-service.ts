import { HttpClient } from '@angular/common/http';
import { Signal, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { GameConfig } from '@core/services/game-config';
import { GameService } from './game-service';
import { Guess } from '@core/models/guess';
import { Card } from '@core/models/card';

import { seededShuffle, getTodayKey, hashString, getYesterdayKey } from '@shared/daily-random';
import { restoreState, saveState } from '@core/cache/storage-functions';

export abstract class BaseGameService implements GameService {
    protected readonly http = inject(HttpClient);

    private readonly dayKey = signal(getTodayKey());

    protected readonly _guesses = signal<Guess[]>([]);
    readonly guesses = this._guesses.asReadonly();

    readonly cards: Signal<Card[]>;

    readonly target = computed<Card | null>(() => {
        const cards = this.cards();
        if (!cards.length) return null;

        const seed = hashString(`${this.dayKey()}:${this.config.modeKey}`);
        return seededShuffle(cards, seed)[0];
    });

    readonly yesterdayTarget = computed<Card | null>(() => {
        const cards = this.cards();
        if (!cards.length) return null;

        const yesterday = getYesterdayKey();

        const seed = hashString(`${yesterday}:${this.config.modeKey}`);
        return seededShuffle(cards, seed)[0];
    });

    readonly isGameWon = computed(() =>
        this._guesses().some(g => g.isCorrect)
    );

    readonly guessedNames = computed(() =>
        this._guesses().map(g => g.card.name)
    );

    constructor(protected readonly config: GameConfig) {
        this.cards = toSignal(
            this.http.get<Card[]>(config.dataUrl),
            { initialValue: [] }
        );

        this._guesses.set(restoreState(config.storageKey));

        effect(() => {
            saveState(config.storageKey, this._guesses());
        });

        this.startDailyTicker();
    }

    submitGuess(cardName: string): void {
        if (this.isGameWon()) return;

        const card = this.cards().find(c => c.name === cardName);
        const target = this.target();

        if (!card || !target) return;

        this._guesses.update(prev => [
            { card, isCorrect: card.name === target.name },
            ...prev,
        ]);
    }

    private startDailyTicker(): void {
        setInterval(() => {
            const today = getTodayKey();
            if (today !== this.dayKey()) {
                this.dayKey.set(today);
                this._guesses.set([]);
                localStorage.removeItem(this.config.storageKey);
            }
        }, 60_000);
    }
}
