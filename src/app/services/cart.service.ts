import { Injectable } from '@angular/core';
import { DataProduct } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

import { SweetAlertService } from './sweet-alert.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor( private sweetAlertService: SweetAlertService ) { }

  getCartItems() {
    const cartString = localStorage.getItem( 'shoppingCart' );
    return cartString ? JSON.parse( cartString ) : [];
  }

  private saveCart( cart: CartItem[] ) {
    localStorage.setItem( 'shoppingCart', JSON.stringify( cart ) );
  }

  updateToCart( product: DataProduct, change: number = 0 ) {
    // Paso 1: Obtener todos los productos agregados en el localStorage
    this.cartItems = this.getCartItems();

    // Validando si la cantidad de producto esta disponible
    if( product.quantity ) {

      // Buscamos si el producto existe en el carrito
      const existingItem = this.cartItems.find( ( item: CartItem ) => {
        return item.product._id === product._id;
      } );

      // Validar si Existe el producto en el carrito
      if( existingItem ) {
        // console.log( 'Existe el producto en el carrito' );
        // TODO: No agrega el valor disponible del producto
        // existingItem.cartQuantity = ( change === 0 ) ? 0 : existingItem.cartQuantity + change;

        if( change === 0 ) {
          existingItem.cartQuantity = 0;              // Establecerlo en cero para eliminarlo del carrito

          this.sweetAlertService.cartUpdateWindow( `Elimina el ${ product.name } del carrito` );
          console.log( `Elimina el ${ product.name } del carrito` );
        }
        else if( change < 0 ) {
          existingItem.cartQuantity = existingItem.cartQuantity + change;   // Decrementarlo

          this.sweetAlertService.cartUpdateWindow( `Elimina ${ Math.abs( change ) } ${ product.name } del carrito` );
          console.log( `Elimina ${ Math.abs( change ) } ${ product.name } del carrito` );
        }
        else if ( ( existingItem.cartQuantity + change ) <= product.quantity ) {
          existingItem.cartQuantity = existingItem.cartQuantity + change;   // Incrementarlo

          this.sweetAlertService.cartUpdateWindow( `Agrega ${ change } ${ product.name } al carrito` );
          console.log( `Agrega ${ change } ${ product.name } al carrito` );
        }
        else {
          this.sweetAlertService.cartUpdateErrorWindow( `Only ${ product.quantity } units available` );
        }
      }
      else {
        // console.log( 'No existe el producto en el carrito' );
        const newCartItem: CartItem = {
          product,
          cartQuantity: change
        };

        this.cartItems.push( newCartItem );

        this.sweetAlertService.cartUpdateWindow( `Agrega ${ change } ${ product.name } nuevo/s al carrito` );
        console.log( `Agrega ${ change } ${ product.name } nuevo/s al carrito` );
      }

    }

    const removedItems = this.cartItems.filter( ( item ) => item.cartQuantity <= 0 );
    // console.log( 'removedItems: ', removedItems );

    if( removedItems.length > 0 ) {
      this.cartItems = this.cartItems.filter( ( item ) => item.cartQuantity > 0 );
    }


    // Paso 3: Guardar los productos agregados al carrito en el localStorage
    this.saveCart( this.cartItems );
  }

  calculateCartTotal() {
    const total = this.cartItems.reduce( ( total, item ) => {

      // Asegurarme que el precio y la cantidad de producto no sean indefinidos o nulos
      const price = item.product.price ?? 0;
      const quantity = item.cartQuantity ?? 0;

      return total + ( price * quantity );
    }, 0 );

    return total;
  }
}
