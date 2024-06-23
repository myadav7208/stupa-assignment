import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/commons/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() selectedProduct = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  viewProduct() {
    this.selectedProduct.emit(this.product);
  }
}