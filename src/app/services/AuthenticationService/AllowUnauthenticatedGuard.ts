// Importando los módulos necesarios de Angular core y Angular router.
import { Injectable } from '@angular/core'; // Injectable es un decorador que marca una clase como disponible para ser proporcionada e inyectada como dependencia.
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; // CanActivate es una interfaz que una clase puede implementar para ser un guardia que decide si una ruta se puede activar. ActivatedRouteSnapshot y RouterStateSnapshot son clases que contienen información sobre la ruta activa en un momento dado.

// Decorador Injectable para marcar la clase como inyectable.
@Injectable({
  providedIn: 'root' // Esto significa que el guardia es proporcionado en el nivel de raíz y es compartido en toda la aplicación.
})
// Definiendo la clase AllowUnauthenticatedGuard que implementa la interfaz CanActivate.
export class AllowUnauthenticatedGuard implements CanActivate {
  // Método que decide si una ruta se puede activar.
  canActivate(
    route: ActivatedRouteSnapshot, // Contiene la información sobre una ruta asociada con un componente cargado en un outlet en un momento particular.
    state: RouterStateSnapshot // Representa el estado del router en un momento dado.
  ): boolean {
    console.log('AllowUnauthenticatedGuard canActivate called'); // Imprime un mensaje en la consola.
    return true; // Devuelve verdadero, lo que significa que la ruta puede ser activada.
  }
}
