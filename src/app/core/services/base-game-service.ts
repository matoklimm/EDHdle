import { HttpClient } from '@angular/common/http';
import { Signal, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameConfig } from '@core/models/game-config';
import { GameService } from './game-service';
import { Guess } from '@core/models/guess';
import { Card } from '@core/models/card';
import { dailyIndex } from './daily-random';
import { restoreState, saveState } from '@core/cache/storage-functions';

export abstract class BaseGameService implements GameService {
    protected http = inject(HttpClient);

    protected _guesses = signal<Guess[]>([]);

    protected _allCards: Signal<Card[]>;
    protected _target: Signal<Card | null>;

    readonly guesses = this._guesses.asReadonly();
    readonly cards: Signal<Card[]>;
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
            const all = this._allCards();
            return all.length ? all[dailyIndex(all.length)] : null;
        });

        this.target = this._target;

        this._guesses.set(restoreState(config.storageKey));

        effect(() => {
            saveState(config.storageKey, this._guesses());
        });
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
}
