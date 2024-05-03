// Importando los módulos necesarios de Angular core y Angular router.
import { Injectable } from '@angular/core'; // Injectable es un decorador que marca una clase como disponible para ser proporcionada e inyectada como dependencia.
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'; // CanActivate es una interfaz que una clase puede implementar para ser un guardia que decide si una ruta se puede activar. ActivatedRouteSnapshot y RouterStateSnapshot son clases que contienen información sobre la ruta activa en un momento dado.
import { UserService } from '../user/user.service'; // Importando UserService, que es presumiblemente un servicio que maneja operaciones relacionadas con 'usuario'.

// Decorador Injectable para marcar la clase como inyectable.
@Injectable({
  providedIn: 'root' // Esto significa que el servicio es proporcionado en el nivel de raíz y es compartido en toda la aplicación.
})
// Definiendo la clase AuthenticationService que implementa la interfaz CanActivate.
export class AuthenticationService implements CanActivate {
  // Método constructor para la clase. Aquí se inyectan los servicios UserService y Router.
  constructor(private userService: UserService, private router: Router) { }

  // Método que decide si una ruta se puede activar.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userService.isAuthenticated()) { // Si el usuario no está autenticado...
      // Si no hay token, redirige al inicio de sesión
      this.router.navigate(['/login']); // Navega a la página de inicio de sesión.
      return false; // Devuelve falso, lo que significa que la ruta no puede ser activada.
    }
    return true; // Si el usuario está autenticado, devuelve verdadero, lo que significa que la ruta puede ser activada.
  }
}
