import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/commons/services/product.service';
import { Router } from '@angular/router';
import { CommonUtil } from 'src/commons/utilities/commonUtil';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [CommonUtil]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isDataFetched = false;
  selectedProduct!: Product | null;

  constructor(private readonly productService: ProductService,
    private router: Router,
    private commonUtil: CommonUtil
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response.map(product => ({ ...product, quantity: 1 }));
        this.isDataFetched = true
      },
      (error) => { console.log('Error occured while fetching data', error); this.isDataFetched = true }
    );
  }

  sortProductsByPrice(order: string) {
    if (order === 'lowToHigh') {
      this.products = this.products.sort((product1, product2) => product1.price - product2.price);
    } else if (order === 'highToLow') {
      this.products = this.products.sort((product1, product2) => product2.price - product1.price);
    }
  }

  closeModal(): void {
    const modalElement = document.getElementById('productModal');
    this.commonUtil.closeModal(modalElement);
    this.router.navigate(['/cart']);
  }

  onModalClose() {
    this.selectedProduct = null;
  }

  viewProduct(product: Product) {
    this.selectedProduct = product;
  }

}
