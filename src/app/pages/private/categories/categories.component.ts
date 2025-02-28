import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Input() data!: string; // Propiedad de entrada para detectar cambios

  constructor() {
    console.log('%c constructor: Se ejecuta cuando Angular instancia el componente.', 'color: blue');
  }

  ngOnInit() {
    console.log('%c ngOnInit: Se ejecuta una vez después de inicializar todas las entradas del componente.', 'color: green');
  }

  ngOnChanges() {
    console.log('%c ngOnChanges: Se ejecuta cuando cambian las entradas del componente.', 'color: orange');
  }

  ngDoCheck() {
    console.log('%c ngDoCheck: Se ejecuta en cada verificación de cambios del componente.', 'color: red');
  }

  ngAfterContentInit() {
    console.log('%c ngAfterContentInit: Se ejecuta una vez después de inicializar el contenido del componente.', 'color: purple');
  }

  ngAfterContentChecked() {
    console.log('%c ngAfterContentChecked: Se ejecuta cada vez que se verifica el contenido del componente.', 'color: brown');
  }

  ngAfterViewInit() {
    console.log('%c ngAfterViewInit: Se ejecuta una vez después de inicializar la vista del componente.', 'color: teal');
  }

  ngAfterViewChecked() {
    console.log('%c ngAfterViewChecked: Se ejecuta cada vez que se verifica la vista del componente.', 'color: pink');
  }

  afterNextRender() {
    console.log('%c afterNextRender: Se ejecuta una vez después de que todos los componentes han sido renderizados en el DOM.', 'color: navy');
  }

  afterRender() {
    console.log('%c afterRender: Se ejecuta cada vez que todos los componentes han sido renderizados en el DOM.', 'color: cyan');
  }

  ngOnDestroy() {
    console.log('%c ngOnDestroy: Se ejecuta antes de que el componente sea destruido.', 'color: black');
  }
}
