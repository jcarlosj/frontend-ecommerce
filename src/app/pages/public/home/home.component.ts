import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { DataProduct } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: DataProduct[] | undefined;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    /** Obtener todos los productos del backend */
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

  addToCard( product: DataProduct ) {
    this.cartService.updateToCart( product, +1 );
  }
}
