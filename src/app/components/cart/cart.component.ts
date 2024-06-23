import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/commons/services/auth.service';
import { CartService } from 'src/commons/services/cart.service';
import { Product } from 'src/commons/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  form!: FormGroup;
  totalPrice = 0;

  constructor(private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly router: Router) {
    // Adding quantity property at frontend for demonstration purpose only
    this.products = this.cartService.getCart().map(product => ({ ...product, quantity: 1 }));
    this.form = new FormGroup({
      productControl: new FormArray(this.addFormControl())
    });
    this.calculateTotal();
  }

  addFormControl(): FormGroup[] {
    let formControls: FormGroup[] = [];
    this.products.forEach((product) => formControls.push(new FormGroup({ quantity: new FormControl(product.quantity) })));
    return formControls;
  }

  get productDetails(): FormArray {
    return this.form.get("productControl") as FormArray
  }

  ngOnInit(): void {
  }

  checkout() {
    if (this.authService.isLoggedIn()) {
      alert('Thank you for shopping! The checkout process is under development. Stay tuned for updates.');
      this.router.navigate(['/']);
    } else {
      alert('Please login to checkout')
    }
  }

  changeQuantity(index: number, control: any, newQuantity: number) {
    newQuantity = newQuantity > 1 ? newQuantity : 1
    control?.setValue(newQuantity);
    this.products[index].quantity = newQuantity;
    this.calculateTotal();
  }

  removeControl(index: number) {
    (this.form.get("productControl") as FormArray).removeAt(index);
    this.products.splice(index, 1);
    this.calculateTotal();
  }

  calculateTotal() {
    this.cartService.updateCartProducts(this.products);
    this.totalPrice = Math.round(this.products.reduce((result, product) => result + (product.quantity * product.price), 0));
  }

}
