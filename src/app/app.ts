import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet],
})
export class App {
  protected readonly title = signal('balatro-clone');
  protected readonly playerName = signal('Player One');
  protected readonly menuItems = ['Play', 'Options', 'Collection', 'Quit'];
}
