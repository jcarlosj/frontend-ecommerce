import { Component, Input } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ JsonPipe ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  /** Atributos */
  categories: any = [];   // Visualizar el contenido en vista

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log( 'Inicializar el componente' );
    this.loadData();
  }

  loadData() {
    this.categoriesService.getCategories().subscribe({
      next: ( data: any ) => {
        console.log( data );
        this.categories = data.data;
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {
        console.log( 'Se obtienen las categorias exitosamente' );
      }
    });
  }

  removeCategory( id: string ) {
    this.categoriesService.deleteCategory( id ).subscribe({
      next: ( data ) => {
        console.log( data );
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {
        console.log( 'Se elimina la catgoria exitosamente' );
        this.loadData();
      }
    });
  }

  goEditCategory( id: string ) {
    // Redireccionamos a dashboard/category/edit y concatenamos ID de la categoria
    this.router.navigateByUrl( 'dashboard/category/edit/' + id );
  }
}
