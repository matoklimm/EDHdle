import { Component } from '@angular/core';

@Component({
  selector: 'app-info-shell',
  imports: [],
  template:
    `
  <div class="info-shell">
    <div class="info-content">
        <ng-content></ng-content>
    </div>
  </div>
  `
})
export class InfoShell {

}
