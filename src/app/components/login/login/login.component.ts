import {ChangeDetectorRef, Component} from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {LoginAuth} from "../../../common/interfaces/LoginRequest";
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {CreateUser} from '../../../common/interfaces/CreateUser';
import {MatDialog} from '@angular/material/dialog';
import {RegisterComponent} from "../register/register/register.component";

// Decorador de Componente para definir metadatos para el LoginComponent.
@Component({
  selector: 'app-login', // El selector CSS que identifica este componente en una plantilla.
  templateUrl: '../login/login.component.html', // La URL del archivo de plantilla para este componente.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    FormsModule,
  ],
  styleUrls: ['../login/login.component.css'] // La URL del archivo de estilo para este componente.
})
// Definiendo la clase LoginComponent.
export class LoginComponent {
  login: LoginAuth; // Un objeto de autenticación de inicio de sesión.

  // Método constructor para la clase. Aquí se inyectan los servicios UserService, Router, ActivatedRoute, ChangeDetectorRef y MatDialog.
  constructor(
    private authService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.login = new LoginAuth('', ''); // Inicializa el objeto de autenticación de inicio de sesión.
  }

  // Método para iniciar sesión. Utiliza el método login del servicio UserService.
  loginMethod(): void {
    this.authService.login(this.login).subscribe({
      next: token => {
        console.log('Authentication successful, received token: ' + token); // Imprime el token de autenticación en la consola.
        localStorage.setItem('authToken', token); // Almacena el token de autenticación en el almacenamiento local.
        this.authService.getUsername(this.login.email).subscribe(username => {
          localStorage.setItem('username', username); // Almacena el nombre de usuario en el almacenamiento local.
          localStorage.setItem('email', this.login.email); // Almacena el correo electrónico en el almacenamiento local.
          this.router.navigate(['/home']); // Navega a la página de inicio.
          this.changeDetector.detectChanges(); // Fuerza la detección de cambios.
        });
      },
      error: error => {
        console.error('Authentication failed:', error); // Imprime el error en la consola.
      }
    });
  }

  // Método para abrir el modal de registro. Navega a la página de creación de cuenta.
  openRegisterModal(): void {
    this.router.navigate(['/create-account']);
  }

}
