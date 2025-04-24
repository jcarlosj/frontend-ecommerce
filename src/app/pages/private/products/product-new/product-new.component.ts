import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoriesService } from '../../../../services/categories.service';
import { DataCategory } from '../../../../models/category.model';
import { ProductsService } from '../../../../services/products.service';


@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './product-new.component.html',
  styleUrl: './product-new.component.css'
})
export class ProductNewComponent {
  /** Atributos */
  formData!: FormGroup;
  categories: DataCategory[] | undefined;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private router: Router
  ) {

    /** Agrupacion de campos del formulario */
    this.formData = new FormGroup({
      reference: new FormControl( '', [ Validators.required, Validators.minLength( 8 ), Validators.maxLength( 15 ) ] ),
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' ),
      price: new FormControl( 0, [ Validators.required, Validators.min( 0 ) ] ),
      quantity: new FormControl( 1, [ Validators.required, Validators.min( 1 ) ]),
      category: new FormControl( '', [ Validators.required ] ),
      urlImage: new FormControl( '' ),
      state: new FormControl( true, [ Validators.required ] )
    });
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: ( data ) => {
        console.log( data );

        this.categories = data.data;
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {

      }
    });
  }

  onSubmit() {
    // Verifica el estado de validacion del formulario
    if( this.formData.valid ) {
      console.log( this.formData.value );

      /** Conectar el ProductService para registrar el producto ingresado en el formulario */
      this.productsService.registerProduct( this.formData.value ).subscribe({
        next: ( data ) => {
          console.log( data );
          this.router.navigateByUrl( '/dashboard/products' );
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();
        }
      });
    }
  }
}
