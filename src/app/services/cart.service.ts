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

  updateToCart(product: DataProduct, change: number): void {
    // Paso 1: Obtener carrito desde localStorage
    this.cartItems = this.getCartItems();

    // Paso 2: Buscar si el producto ya está en el carrito
    const existingItem = this.cartItems.find(
      (item: CartItem) => item.product._id === product._id
    );

    // Paso 3: Validar que haya cantidad definida
    if (product.quantity === undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Product quantity is undefined`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }

    // ✨ CASO ESPECIAL: Si el cambio es negativo y el producto NO está en el carrito
    if (!existingItem && change < 0) {
      console.warn('Cannot decrease quantity of a product not in cart');

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Cannot decrease quantity of a product not in cart`,
        footer: '<a href="#">Why do I have this issue?</a>'
      });

      return;
    }

    let newQuantity: number;

    // Paso 4: Si el producto ya está en el carrito
    if (existingItem) {
      // Si el usuario manda `change === 0`, forzamos a 0
      if (change === 0) {
        newQuantity = 0;
      } else {
        newQuantity = existingItem.cartQuantity + change;
      }

      // Validar stock máximo (solo para cambios positivos)
      if (change > 0 && newQuantity > product.quantity) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Only ${product.quantity} units available. Cannot add ${change} more.`,
          footer: '<a href="#">Why do I have this issue?</a>'
        });

        return; // No hacer cambios
      }

      // Validar que no se reste más de lo que tiene
      if (change < 0 && newQuantity < 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `You only have ${existingItem.cartQuantity} items selected. Cannot remove ${Math.abs(change)}.`,
          footer: '<a href="#">Why do I have this issue?</a>'
        });

        return; // No hacer cambios
      }

      // Aplicar el cambio
      existingItem.cartQuantity = newQuantity;

      // Mostrar mensaje solo si se agregan elementos
      if (change > 0) {
        Swal.fire({
          position: "bottom-end",
          icon: "success",
          title: `You have added ${existingItem.cartQuantity} ${product.name}(s) to the cart`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      // Paso 5: Si no existe y se agrega (+change)
      if (change > 0) {
        if (product.quantity >= change) {
          const newCartItem: CartItem = {
            product: product,
            cartQuantity: change
          };

          this.cartItems.push(newCartItem);

          Swal.fire({
            position: "bottom-end",
            icon: "success",
            title: `You have added ${change} ${product.name}(s) to the cart`,
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Only ${product.quantity} units available. Cannot add ${change}.`,
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          return;
        }
      } else {
        // No existe y se intenta restar o setear a 0
        return;
      }
    }

    // Paso 6: Eliminar todos los productos con cartQuantity <= 0
    this.cartItems = this.cartItems.filter(item => item.cartQuantity > 0);

    // Paso 7: Guardar carrito actualizado
    this.saveCart(this.cartItems);
  }


}
