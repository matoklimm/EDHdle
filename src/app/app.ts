import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Footer } from "@app/components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('edhdle');
}
