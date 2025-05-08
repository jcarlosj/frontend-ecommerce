import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../models/cart-item.model';
import { CurrencyPipe } from '@angular/common';

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

}
