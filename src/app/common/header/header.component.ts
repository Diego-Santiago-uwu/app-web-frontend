import { Component } from '@angular/core';

// Decorador de Componente para definir metadatos para el HeaderComponent.
@Component({
  selector: 'app-header', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo. Actualmente está vacío.
  ],
  templateUrl: './header.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: '../../app.component.css', // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase HeaderComponent.
export class HeaderComponent {
  // Método constructor para la clase. Actualmente, está vacío y no hace nada.
  constructor() {
  }
}
