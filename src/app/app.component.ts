// Importando los módulos necesarios de Angular core y otros módulos locales.
import {Component} from '@angular/core'; // Component es un decorador que marca una clase como un componente de Angular y proporciona metadatos de configuración.
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router'; // NavigationEnd es un evento desencadenado cuando una navegación termina con éxito. Router es un servicio que proporciona navegación entre vistas. RouterModule es un módulo que proporciona servicios necesarios para la navegación. RouterOutlet es una directiva de Angular Router que marca donde el router debería mostrar las vistas.
// Importando los componentes y servicios necesarios.
import {ProductListComponent} from "./components/products/product-list/product-list.component";
import {ProductService} from "./services/product/product.service";
import {NavBarComponent} from "./common/nav-bar/nav-bar.component";
import {HeaderComponent} from "./common/header/header.component";
import {FooterComponent} from "./common/footer/footer.component";
import {DetailsProductComponent} from "./components/products/details-product/details-product.component";
import {AppRoutingModule} from "./app.routes";
import {HomeComponent} from "./common/home/home.component";
import {LoginComponent} from "./components/login/login/login.component";
import {UserService} from "./services/user/user.service";
import {CommonModule, NgIf} from "@angular/common"; // CommonModule es uno de los módulos más utilizados de Angular que proporciona muchas directivas comunes como ngIf y ngFor. NgIf es una directiva que condicionalmente incluye una plantilla basada en el valor de una expresión.
import {filter} from "rxjs"; // filter es un operador de RxJS que filtra los valores emitidos por un Observable.
import {OrderService} from "./services/order/order.service";
import {MatDialogModule} from "@angular/material/dialog"; // MatDialogModule es un módulo que proporciona servicios para abrir vistas de diálogo.
import {RegisterComponent} from "./components/login/register/register/register.component";
import {AllowUnauthenticatedGuard} from "./services/AuthenticationService/AllowUnauthenticatedGuard";

// Decorador Component para marcar la clase como un componente de Angular y proporcionar metadatos de configuración.
@Component({
  selector: 'app-root', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Indica que este componente es independiente y no requiere de un componente padre.
  imports: [ // Los módulos que este componente necesita.
    ProductListComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    DetailsProductComponent,
    AppRoutingModule,
    HomeComponent,
    RouterModule,
    LoginComponent,
    NgIf,
    MatDialogModule,
    RegisterComponent,
    CommonModule
  ],
  providers: [ // Los proveedores de servicios que este componente necesita.
    ProductService,
    UserService,
    OrderService,
    AllowUnauthenticatedGuard
  ],
  templateUrl: './app.component.html', // La ubicación de la plantilla de este componente.
  styleUrl: './app.component.css' // La ubicación de los estilos de este componente.
})
// Definiendo la clase AppComponent.
export class AppComponent {
  title = 'app-web'; // El título de la aplicación.

  isAuthenticated: boolean | undefined; // Indica si el usuario está autenticado. Puede ser indefinido.

  // Método constructor para la clase. Aquí se inyectan los servicios UserService y Router.
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  // Método que se llama cuando se inicializa este componente.
  ngOnInit() {
    // Limpia el almacenamiento local al inicio de la aplicación.
    localStorage.clear();

    // Verifica si el token existe en el almacenamiento local.
    this.isAuthenticated = !!this.userService.getToken();

    // Se suscribe a los eventos de navegación.
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Filtra los eventos para obtener solo los eventos de NavigationEnd.
    ).subscribe((event: NavigationEnd) => {
      // Verifica si el usuario está autenticado.
      this.isAuthenticated = !!this.userService.getToken();

      // Si el usuario no está autenticado y no está intentando acceder a la página de registro, redirige a la página de inicio de sesión.
      if (!this.isAuthenticated && event.urlAfterRedirects !== '/create-account') {
        this.router.navigate(['/login']).then(r => console.log('Redirected to login page'));
      }
    });
  }
}
