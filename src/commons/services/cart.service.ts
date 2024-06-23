import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  updateCart = new Subject<void>();

  constructor() { }

  addProductToCart(product: Product): void {
    const cart = this.getCart();
    const isProductInCart = cart.some(cartProduct => cartProduct.id === product.id);
    if (!isProductInCart) {
      cart.push(product);
      this.saveCart(cart);
    }
  }

  updateCartProducts(products: Product[]): void {
    this.saveCart(products);
  }

  getCart(): Product[] {
    const productsInCart = localStorage.getItem('cart');
    return productsInCart ? JSON.parse(productsInCart) : [];
  }

  private saveCart(cart: Product[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateCart.next();
  }
}
