import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './components/counter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,Counter],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
