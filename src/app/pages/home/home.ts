import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  infoOpen = signal(false);

  toggleInfo() {
    this.infoOpen.update(v => !v);
  }
}
