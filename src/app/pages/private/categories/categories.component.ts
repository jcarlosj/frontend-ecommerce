import { Component, Input } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ RouterLink ],
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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        /** El CategoriService esta eliminiando la categoria */
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

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  }

  goEditCategory( id: string ) {
    // Redireccionamos a dashboard/category/edit y concatenamos ID de la categoria
    this.router.navigateByUrl( 'dashboard/category/edit/' + id );
  }
}
