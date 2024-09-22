import { Component } from '@angular/core';

@Component({
  selector: 'counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.html',
  styleUrls: [ './counter.css' ]
})
export class Counter {
  private counter: number = 0;

  get value(): number {
    return this.counter;
  }

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    if( this.counter > 0 ) {
      this.counter--;
    }
  }
}


