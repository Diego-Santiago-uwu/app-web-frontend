import { Component } from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {Product} from "../interfaces/Product";
import {NgIf} from "@angular/common";

// Decorador de Componente para definir metadatos para el NavBarComponent.
@Component({
  selector: 'app-nav-bar', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    RouterLink,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './nav-bar.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: '../../app.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase NavBarComponent.
export class NavBarComponent {
  private currentProducts: Product[] | undefined; // Una lista de productos actualmente seleccionados. Es privado y puede ser indefinido.

  username: string | undefined; // El nombre de usuario del usuario actualmente autenticado. Puede ser indefinido.

  // Método constructor para la clase. Aquí se inyectan los servicios ProductService y UserService.
  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  // Método que se ejecuta después de que Angular ha inicializado todas las propiedades vinculadas a datos del componente.
  ngOnInit() {
    const email = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (email) {
      this.userService.getUsername(email).subscribe(response => { // Si el correo electrónico existe, obtiene el nombre de usuario del servicio de usuario.
        this.username = response; // Establece el nombre de usuario en la respuesta.
        console.log('Username from response:', response); // Imprime el nombre de usuario de la respuesta.
        localStorage.setItem('username', response); // Establece el nombre de usuario en el almacenamiento local.
        console.log('Username from localStorage:', localStorage.getItem('username')); // Imprime el nombre de usuario del almacenamiento local.
        console.log('Username in component:', this.username); // Imprime el nombre de usuario en el componente.
      });
    }
  }

  // Método para cargar productos por categoría. Utiliza el método getProductCategory del servicio ProductService.
  loadProductsByCategory(categoryName: string, subcategoryName?: string) {
    this.productService.getProductCategory(categoryName, subcategoryName).subscribe({
      next: (products) => {
        console.log(products); // Imprime los productos obtenidos.
        this.productService.setCurrentProducts(products); // Establece los productos actuales en los productos obtenidos.
      },
      error: (err) => console.error(err), // Imprime el error si ocurre uno.
    });
  }

  // Método para cerrar sesión. Utiliza el método logout del servicio UserService.
  logout(): void {
    this.userService.logout();
  }

  // Propiedad para el almacenamiento local.
  protected readonly localStorage = localStorage;

  // Propiedad para determinar si el menú desplegable está abierto o no.
  isDropdownOpen: boolean | undefined;

  // Método para alternar el estado de apertura del menú desplegable.
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
