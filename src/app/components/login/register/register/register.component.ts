// Importando los módulos necesarios de Angular core, Angular forms y otros módulos locales.
import {ChangeDetectorRef, Component} from '@angular/core'; // Component es un decorador que permite marcar una clase como un componente de Angular y proporcionar metadatos adicionales que determinan cómo se debe procesar, instanciar y usar el componente en tiempo de ejecución. ChangeDetectorRef es una referencia al detector de cambios del componente.
import {FormsModule} from "@angular/forms"; // FormsModule es un módulo que proporciona directivas y servicios para crear formularios en Angular.
import {CreateUser} from "../../../../common/interfaces/CreateUser"; // Importando la interfaz CreateUser, que define la estructura de un 'usuario' para crear.
import {UserService} from "../../../../services/user/user.service"; // Importando UserService, que es presumiblemente un servicio que maneja operaciones relacionadas con 'usuario'.
import {ActivatedRoute, Router} from "@angular/router"; // ActivatedRoute y Router son servicios que permiten interactuar con la URL actual.
import {MatDialog} from "@angular/material/dialog"; // MatDialog es un servicio que abre diálogos de Material Design.

// Decorador de Componente para definir metadatos para el RegisterComponent.
@Component({
  selector: 'app-register', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    FormsModule,
  ],
  templateUrl: './register.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: './register.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase RegisterComponent.
export class RegisterComponent {
  createUser: CreateUser; // Un objeto de creación de usuario.

  // Método constructor para la clase. Aquí se inyectan los servicios UserService, Router, ActivatedRoute, ChangeDetectorRef y MatDialog.
  constructor(
    private userService: UserService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.createUser = { // Inicializa el objeto de creación de usuario.
      username: '',
      password: '',
      email: '',
      roles: [{id: 2, name: 'USER'}], // El rol siempre es USER.
      addresses: [{street: '', city: '', state: '', postalCode: '', country: ''}] // Inicializa las direcciones con valores vacíos.
    };
  }

  // Método para crear una cuenta. Utiliza el método createUser del servicio UserService.
  createAccountMethod(): void {
    this.userService.createUser(this.createUser).subscribe(
      response => {
        console.log('Cuenta creada con exito'); // Imprime el mensaje de éxito en la consola.
        // Redirige al usuario a la página de inicio de sesión.
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error creando cuenta', error); // Imprime el error en la consola.
      }
    );
  }
}
