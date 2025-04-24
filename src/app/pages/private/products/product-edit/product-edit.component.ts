import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataCategory } from '../../../../models/category.model';
import { CategoriesService } from '../../../../services/categories.service';
import { ProductsService } from '../../../../services/products.service';


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  /** Atributos */
    formData!: FormGroup;
    categories: DataCategory[] | undefined;
    selectedId!: string;

    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private categoriesService: CategoriesService,
      private productsService: ProductsService
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
      this.loadCategoryData();
      this.loadParamId();   // --> selectedId
      this.loadformData();
    }

    private loadformData() {
      /** Consulta el producto por ID para cargar los datos en el formulario */
      this.productsService.getProductById( this.selectedId ).subscribe({
        next: ( data: any ) => {
          console.log( data.data );    // { ok: true, data: {…} }

          /** Desestructurando los datos del objeto de respuesta */
          const { reference, name, description, price, quantity, urlImage, state, category } = data.data;

          /** Asignar los valores del producto a los campos del formulario */
          this.formData.patchValue({
            reference,
            name,
            description,
            price,
            quantity,
            urlImage,
            state,
            category
          });

        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {}
      });
    }

    private loadParamId() {
      this.activatedRoute.params.subscribe({
        next: ( data: Params ) => {
          console.log( data[ 'id' ] );

          this.selectedId = data[ 'id' ];

        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {}
      });
    }

    private loadCategoryData() {
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

        /** Actualiza el producto usando el productService */
        this.productsService.updateProductById( this.selectedId, this.formData.value ).subscribe({
          next: ( data ) => {
            console.log( data );
            this.router.navigateByUrl( '/dashboard/products' );
          },
          error: ( error ) => {
            console.error( error );
          },
          complete: () => {}
        });
      }
    }
}
