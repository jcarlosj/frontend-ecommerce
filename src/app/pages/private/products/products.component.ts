import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { DataProduct } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ RouterLink, CurrencyPipe ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: DataProduct[] | undefined;

  constructor( private productsService: ProductsService ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productsService.getProducts().subscribe({
      next: ( data ) => {
        console.log( data );

        this.products = data.data;
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {}
    });
  }

  deleteProduct( id: string ) {
    console.log( 'Elimina el producto con el ID: ' + id );

    /** Elimina el producto por id usando su servicio */
    this.productsService.deleteProductById( id ).subscribe({
      next: ( data ) => {
        console.log( data );
        this.loadData();
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {}
    });
  }

}
