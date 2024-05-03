import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
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

// Definiendo la clase HomeComponent.
export class HomeComponent {
  // Método constructor para la clase. Aquí se inyecta el servicio ProductService.
  constructor(
  ) {
  }
}
