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
    this.cartService.updateToCart2( product, +1 );
    this.cartItems = this.cartService.getCartItems();
  }

  onDecrease( product: DataProduct ) {
    this.cartService.updateToCart2( product, -1 );
    this.cartItems = this.cartService.getCartItems();
  }

  onRemove( product: DataProduct ) {
    this.cartService.updateToCart2( product, 0 );
    this.cartItems = this.cartService.getCartItems();
  }
}
