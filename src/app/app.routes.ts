import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {DetailsProductComponent} from "./components/products/details-product/details-product.component";
import {ProductListComponent} from "./components/products/product-list/product-list.component";
import {HomeComponent} from "./common/home/home.component";
import {ShoppingCartComponent} from "./components/cart/shopping-cart/shopping-cart.component";
import {LoginComponent} from "./components/login/login/login.component";
import { HttpClientModule } from '@angular/common/http';
import {UserService} from "./services/user/user.service";
import { AuthenticationService } from "./services/AuthenticationService/AuthenticationService";
import {OrdersComponent} from "./components/orders/orders.component";
import {RegisterComponent} from "./components/login/register/register/register.component";
import {AllowUnauthenticatedGuard} from "./services/AuthenticationService/AllowUnauthenticatedGuard";
import {AboutComponent} from "./common/about/about.component";

export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create-account', component: RegisterComponent, canActivate: [AllowUnauthenticatedGuard] },  { path: 'product/:category', component: ProductListComponent},
  { path: 'product/:category/:subcategory', component: ProductListComponent},
  { path: 'product-details/:sku', component: DetailsProductComponent},
  { path: 'cart', component: ShoppingCartComponent},
  { path: 'orders', component: OrdersComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

