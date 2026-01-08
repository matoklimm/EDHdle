import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Card } from '@core/models/card';

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

  constructor(private router: Router) { }

  private modes: ModeAction[] = [
    {
      key: 'commander',
      label: 'Commander',
      link: '/commander',
      icon: '/icons/commander.png',
    },
    {
      key: 'staple',
      label: 'Staples',
      link: '/staple',
      icon: '/icons/staple.png',
    },
    {
      key: 'card',
      label: 'Card',
      link: '/card',
      icon: '/icons/card.png',
    },
    {
      key: 'oracle',
      label: 'Oracle',
      link: '/oracle',
      icon: '/icons/oracle.png',
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
