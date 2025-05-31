import { Injectable } from '@angular/core';
import { DataProduct } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  constructor() { }

  getCartItems() {
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
      // alert( 'La cantidad de producto no esta definida' );

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Product quantity is undefined`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });

      return;
    }

    if( existingItem ) {
        // Incrementar en 1 la propiedad de cartQuantity, siempre que haya stock suficiente
        if( existingItem.cartQuantity + 1 <= product.quantity ) {
          existingItem.cartQuantity ++;

          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: `You have added ${ existingItem.cartQuantity } ${ existingItem.product.name } to the cart`,
            showConfirmButton: false,
            timer: 1500
          });

        }
        else {
          // alert( `Solo hay ${ product.quantity } unidades disponibles` );

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Only ${ product.quantity } units available`,
            footer: '<a href="#">Why do I have this issue?</a>'
          });

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

          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: `You have added 1 ${ product.name } to the cart`,
            showConfirmButton: false,
            timer: 1500
          });
        }
        else {
          // alert( 'Producto sin stock disponible' );

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Product out of stock",
            footer: '<a href="#">Why do I have this issue?</a>'
          });

          return;
        }
    }


    // Paso 3: Guardar los productos agregados al carrito en el localStorage
    this.saveCart( this.cartItems );
  }

  updateToCart( product: DataProduct, chance: number = 0 ) {
    // Paso 1: Obtener todos los productos agregados en el localStorage
    this.cartItems = this.getCartItems();

    // Validando si la cantidad de producto esta disponible
    if( product.quantity && Math.abs( chance ) <= product.quantity ) {

      // Buscamos si el producto existe en el carrito
      const existingItem = this.cartItems.find( ( item: CartItem ) => {
        return item.product._id === product._id;
      } );

      // Validar si Existe el producto en el carrito
      if( existingItem ) {
        console.log( 'Existe el producto en el carrito' );
      }
      else {
        console.log( 'No existe el producto en el carrito' );
      }

    }
  }
}
