import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ProductService} from "../../services/product/product.service";
import {AppRoutingModule} from "../../app.routes";
import {RouterModule} from "@angular/router";

// Decorador de Componente para definir metadatos para el AboutComponent.
@Component({
  selector: 'app-about', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    NgForOf,
    RouterModule,
  ],
  templateUrl: './about.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: './about.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase AboutComponent.
export class AboutComponent {
  // Método constructor para la clase. Actualmente, está vacío y no hace nada.
  constructor() {
  }
}
