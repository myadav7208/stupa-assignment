import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/commons/services/cart.service';
import { Product } from 'src/commons/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  productDetail!: Product | null;
  quantity = 1;
  @Input() set product(value: Product | null) {
    if (value) {
      this.productDetail = value
    } else {
      this.productDetail = null;
      this.quantity = 1;
    }
  }
  @Output() closeModalEmitter = new EventEmitter();

  constructor(private readonly cartService: CartService) { }

  ngOnInit(): void {
  }

  changeQuantity(newQuantity: number) {
    this.quantity = newQuantity > 1 ? newQuantity : 1;
  }

  addToCart() {
    if (this.productDetail) {
      this.cartService.addProductToCart(this.productDetail);
      this.closeModalEmitter.emit();
    }
  }

}
