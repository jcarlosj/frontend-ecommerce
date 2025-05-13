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

  private findCartItem(product: DataProduct): CartItem | undefined {
    return this.cartItems.find(item => item.product._id === product._id);
  }

  private validateProductQuantity(product: DataProduct): boolean {
    if (product.quantity === undefined) {
      this.showErrorAlert( `Product quantity is undefined` );
      return true; // indica validación fallida
    }
    return false;
  }

  private handleAddition(existingItem: CartItem, product: DataProduct, newQuantity: number): void {
    if (product.quantity === undefined) {
      this.showErrorAlert( `Product quantity is undefined` );
      return;
    }

    if (newQuantity > product.quantity) {
      this.showErrorAlert( `Only ${product.quantity} units available. Cannot add ${newQuantity}.` );
      return;
    }

    existingItem.cartQuantity = newQuantity;
    this.showSuccessAlert( `You have added ${newQuantity} ${existingItem.product.name}(s) to the cart` );
  }

  private handleSubtraction(existingItem: CartItem, product: DataProduct, newQuantity: number): void {
    if (newQuantity < 0) {
      this.showErrorAlert( `You only have ${existingItem.cartQuantity} items selected. Cannot remove ${Math.abs(newQuantity)}.` );
      return;
    }

    existingItem.cartQuantity = newQuantity;
    this.showSuccessAlert( `You have removed ${newQuantity} ${product.name}(s) from the cart` );
  }

  private showSuccessAlert(message: string): void {
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }

  private showErrorAlert(text: string): void {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  }

  private updateCartItemQuantity(existingItem: CartItem, product: DataProduct, change: number): void {
    let newQuantity: number = ( change === 0 ) ? 0 : existingItem.cartQuantity + change;

    // ✅ Siempre actualizar la cantidad, incluso si es 0
    existingItem.cartQuantity = newQuantity;

    // ✅ Solo manejar adición o sustracción si hace falta
    if (change > 0) {
      this.handleAddition(existingItem, product, newQuantity);
    } else if (change < 0) {
      this.handleSubtraction(existingItem, product, newQuantity);
    }

    // ✅ Asegurarse de eliminar productos con cartQuantity <= 0
    this.removeProductIfNecessary();
  }

  private addToCartWhenNew(product: DataProduct, change: number): void {
    if (change > 0) {
      if (product.quantity === undefined) {
        this.showErrorAlert( `Product quantity is undefined` );
        return;
      }

      if (product.quantity >= change) {
        const newCartItem: CartItem = {
          product: product,
          cartQuantity: change
        };

        this.cartItems.push(newCartItem);

        this.showSuccessAlert( `You have added ${change} ${product.name}(s) to the cart` );
      } else {
        this.showErrorAlert( `Only ${product.quantity} units available. Cannot add ${ change }.` );
      }
    }
  }

  private removeProductIfNecessary(): void {
    const removedItems = this.cartItems.filter(item => item.cartQuantity <= 0);

    if (removedItems.length > 0) {
      // Filtrar productos con cartQuantity > 0
      this.cartItems = this.cartItems.filter(item => item.cartQuantity > 0);

      // Mostrar mensaje de éxito por cada producto eliminado
      removedItems.forEach(item => {
        this.showSuccessAlert( `You have removed ${ removedItems.length } from the cart` );
      });
    }
  }

  updateToCart2( product: DataProduct, change: number ) {
    // Paso 1: Obtener carrito desde localStorage
    this.cartItems = this.getCartItems();

    // Paso 2: Buscar si el producto ya está en el carrito
    const existingItem = this.findCartItem( product );

    // Paso 3: Validar que haya cantidad definida
    if (this.validateProductQuantity(product)) return;

    // ✨ CASO ESPECIAL: Si el cambio es negativo y el producto NO está en el carrito
    if (!existingItem && change < 0) {
      this.showErrorAlert( `Cannot decrease quantity of a product not in cart` );
      return;
    };

    // Paso 4: Si el producto ya está en el carrito
    if (existingItem) {
      this.updateCartItemQuantity(existingItem, product, change);
    } else {
      this.addToCartWhenNew(product, change);
    }

    this.removeProductIfNecessary();
    this.saveCart(this.cartItems);

  }

}
