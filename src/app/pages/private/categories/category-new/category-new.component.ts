import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from '../../../../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-new',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './category-new.component.html',
  styleUrl: './category-new.component.css'
})
export class CategoryNewComponent {
  dataForm!: FormGroup;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {
    this.dataForm = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' )
    });
  }

  onSubmit() {
    if( this.dataForm.valid ) {
      console.log( this.dataForm.value );

      // Sintasis con un objeto observador
      this.categoriesService.registerCategory( this.dataForm.value ).subscribe({
        next: ( data ) => {
          console.log( data );
          this.router.navigateByUrl( 'dashboard/categories' );
        },
        error: ( error ) => {
          console.error( 'ERROR: Al registrar la categoria ', error );
        },
        complete: () => {
          console.log( 'Registro de la categoria completado exitosamente' );
        }
      });

      // Sintaxis con una funcion callback
      // this.categoriesService.registerCategory( this.dataForm.value ).subscribe(
      //   ( data ) => {
      //     console.log( data );    // { ok: true, data: { ... } }
      //     this.router.navigateByUrl( 'dashboard/categories' );
      //   },
      //   ( error ) => {
      //     console.error( 'ERROR: Al registrar la categoria: ', error );
      //   }
      // );

    }

    this.dataForm.reset();
  }

}
