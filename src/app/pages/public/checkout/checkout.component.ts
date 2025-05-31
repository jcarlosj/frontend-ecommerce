import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item.model';
import { CurrencyPipe } from '@angular/common';
import { DataProduct } from '../../../models/product.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartItems: CartItem[] | undefined;

  constructor( private cartService: CartService ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  onIncrease( product: DataProduct ) {
    console.log( 'Incrementa en 1 el producto seleccionado' );
    this.cartService.updateToCart( product, +1 );
    this.ngOnInit();
  }

  onDecrease( product: DataProduct ) {
    console.log( 'Decrementa en 1 el producto seleccionado' );
    this.cartService.updateToCart( product, -1 );
    this.ngOnInit();
  }

  onRemove( product: DataProduct ) {
    console.log( 'Establece el valor en 0 del producto seleccionado' );
    this.cartService.updateToCart( product, 0 );
    this.ngOnInit();
  }

}
