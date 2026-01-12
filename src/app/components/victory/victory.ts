import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Card } from '@core/models/card';
import { DailyTimerService } from '@core/services/daily-timer-service';

type ModeKey = 'commander' | 'staple' | 'card' | 'oracle';

interface ModeAction {
  key: ModeKey;
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-victory',
  imports: [RouterModule],
  templateUrl: './victory.html',
  styleUrl: './victory.css',
})
export class Victory {
  @Input({ required: true }) target!: Card;
  @Output() close = new EventEmitter<void>();

  private timerService = inject(DailyTimerService);

  readonly resetLabel = computed(() => {
    const { hours, minutes, seconds } = this.timerService.timeUntilReset();

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });

  constructor(private router: Router) { }

  private modes: ModeAction[] = [
    {
      key: 'commander',
      label: 'Commander',
      link: '/commander',
      icon: '/icons/commander.avif',
    },
    {
      key: 'staple',
      label: 'Staple',
      link: '/staple',
      icon: '/icons/staple.avif',
    },
    {
      key: 'card',
      label: 'Card',
      link: '/card',
      icon: '/icons/card.avif',
    },
    {
      key: 'oracle',
      label: 'Oracle',
      link: '/oracle',
      icon: '/icons/oracle.avif',
    },
  ];

  get currentMode(): ModeKey {
    if (this.router.url.startsWith('/commander')) return 'commander';
    if (this.router.url.startsWith('/staple')) return 'staple';
    if (this.router.url.startsWith('/card')) return 'card';
    return 'oracle';
  }

  get nextModes(): ModeAction[] {
    return this.modes.filter(m => m.key !== this.currentMode);
  }
}
