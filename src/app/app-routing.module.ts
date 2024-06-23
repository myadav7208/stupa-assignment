import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from 'src/commons/components/main-content/main-content.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [{
    path: '',
    component: MainContentComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: MainContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
