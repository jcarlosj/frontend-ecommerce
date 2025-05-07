import { Injectable } from '@angular/core';
import { DataProduct } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor() { }

  private getCartItems() {
    const cartString = localStorage.getItem( 'shoppingCart' );
    return cartString ? JSON.parse( cartString ) : [];
  }

  private saveCart( cart: CartItem[] ) {
    localStorage.setItem( 'shoppingCart', JSON.stringify( cart ) );
  }

  addToCart( product: DataProduct ) {
    // Paso 1: Obtener todos los productos agregados en el localStorage
    this.cartItems = this.getCartItems();

    // Paso 2:
    // Verificar si el producto ya esta en el carrito
    const existingItem = this.cartItems.find( ( item: CartItem  ) => {
      return item.product._id === product._id;
    } );

    // Verificar que la cantidad del producto NO este indefinida
    if( product.quantity === undefined ) {
      alert( 'La cantidad de producto no esta definida' );
      return;
    }

    if( existingItem ) {
        // Incrementar en 1 la propiedad de cartQuantity, siempre que haya stock suficiente
        if( existingItem.cartQuantity + 1 <= product.quantity ) {
          existingItem.cartQuantity ++;
        }
        else {
          alert( `Solo hay ${ product.quantity } unidades disponibles` );
          return;
        }
    }
    else {
        // Agregar al carrito el nuevo producto con cartQuantity = 1, siempre que haya stock suficiente
        if( product.quantity >= 1 ) {
          const newCartItem: CartItem = {
            product: product,
            cartQuantity: 1
          }

          this.cartItems.push( newCartItem );
        }
        else {
          alert( 'Producto sin stock disponible' );
          return;
        }
    }


    // Paso 3: Guardar los productos agregados al carrito en el localStorage
    this.saveCart( this.cartItems );
  }
}
