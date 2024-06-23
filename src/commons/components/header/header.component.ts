import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/commons/services/auth.service';
import { CartService } from 'src/commons/services/cart.service';
import { Product } from 'src/commons/services/product.service';
import { CommonUtil } from 'src/commons/utilities/commonUtil';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CommonUtil]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserLoggedIn = false;
  cart: Product[] = [];
  cartSubscription!: Subscription;

  constructor(private readonly authService: AuthService,
    private readonly cartService: CartService,
    private readonly commonUtil: CommonUtil) {

  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cartSubscription = this.cartService.updateCart.subscribe(() => {
      this.cart = this.cartService.getCart();
      this.isUserLoggedIn = this.authService.isLoggedIn();
    });
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }

  closeModal(): void {
    const modalElement = document.getElementById('loginModal');
    this.commonUtil.closeModal(modalElement);
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe()
  }
}
