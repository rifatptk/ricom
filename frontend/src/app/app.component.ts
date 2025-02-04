import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initSupertokens } from './supertoke.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'ricom-fe';

  constructor() {
    initSupertokens();
  }
}
