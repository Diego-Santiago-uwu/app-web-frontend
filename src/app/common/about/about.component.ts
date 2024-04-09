import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductService} from "../../services/product/product.service";
import {AppRoutingModule} from "../../app.routes";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    RouterModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  constructor(
    private  productService:ProductService,
  ) {
  }

  getProducts(categoryName: string) {
    this.productService.getProductCategory(categoryName).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
