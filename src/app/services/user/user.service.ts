// Importando los módulos necesarios de Angular core y otros módulos locales.
import { Injectable } from '@angular/core'; // Injectable es un decorador que marca una clase como disponible para ser proporcionada e inyectada como dependencia.
import { HttpClient } from '@angular/common/http'; // HttpClient es un servicio que proporciona una forma de realizar solicitudes HTTP.
import { Observable } from 'rxjs'; // Observable es una clase de RxJS que representa una secuencia de valores a lo largo del tiempo.
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'; // CanActivate es una interfaz que una clase puede implementar para ser un guardia que decide si una ruta se puede activar. ActivatedRouteSnapshot y RouterStateSnapshot son clases que contienen información sobre la ruta activa en un momento dado.
import { LoginRequest } from '../../common/interfaces/LoginRequest'; // Importando la interfaz LoginRequest, que define la estructura de una 'solicitud de inicio de sesión'.
import {User} from "../../common/interfaces/User"; // Importando la interfaz User, que define la estructura de un 'usuario'.
import {CreateUser} from "../../common/interfaces/CreateUser"; // Importando la interfaz CreateUser, que define la estructura de un 'usuario a crear'.

// Decorador Injectable para marcar la clase como inyectable.
@Injectable({
  providedIn: 'root' // Esto significa que el servicio es proporcionado en el nivel de raíz y es compartido en toda la aplicación.
})
// Definiendo la clase UserService que implementa la interfaz CanActivate.
export class UserService implements CanActivate {
  private loginUrl = 'http://localhost:8081/api/users/login'; // URL para iniciar sesión.
  private createUserUrl = 'http://localhost:8081/api/users/create'; // URL para crear un usuario.

  // Método constructor para la clase. Aquí se inyectan los servicios HttpClient y Router.
  constructor(private http: HttpClient, private router: Router) { }

  // Método para iniciar sesión. Utiliza el método post del servicio HttpClient.
  login(loginRequest: LoginRequest): Observable<string> {
    return this.http.post<string>(this.loginUrl, loginRequest, {responseType: 'text' as 'json'}); // Realiza una solicitud POST a la URL con la solicitud de inicio de sesión como cuerpo de la solicitud y devuelve un Observable que emite la respuesta como una cadena.
  }

  // Método para verificar si el usuario está autenticado.
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken'); // Obtiene el token de autenticación del almacenamiento local.
    const isAuthenticated = !!token; // Si el token existe, isAuthenticated es verdadero. Si no, isAuthenticated es falso.
    console.log('isAuthenticated:', isAuthenticated); // Imprime el estado de autenticación en la consola.
    return isAuthenticated; // Devuelve el estado de autenticación.
  }

  // Método para obtener el token de autenticación.
  getToken(): string | null {
    return localStorage.getItem('authToken'); // Devuelve el token de autenticación del almacenamiento local.
  }

  // Método que decide si una ruta se puede activar.
  canActivate(
    route: ActivatedRouteSnapshot, // Contiene la información sobre una ruta asociada con un componente cargado en un outlet en un momento particular.
    state: RouterStateSnapshot // Representa el estado del router en un momento dado.
  ): boolean {
    console.log('AllowUnauthenticatedGuard canActivate called'); // Imprime un mensaje en la consola.
    return true; // Devuelve verdadero, lo que significa que la ruta puede ser activada.
  }

  // Método para cerrar sesión.
  logout(): void {
    localStorage.removeItem('authToken'); // Elimina el token de autenticación del almacenamiento local.
    localStorage.removeItem('username'); // Elimina el nombre de usuario del almacenamiento local.
    localStorage.removeItem('email'); // Elimina el correo electrónico del almacenamiento local.

    this.router.navigate(['/login']); // Navega a la página de inicio de sesión.
  }

  // Método para obtener el nombre de usuario de un usuario. Utiliza el método get del servicio HttpClient.
  getUsername(email: string): Observable<string> {
    const url = `http://localhost:8081/api/users/username?email=${email}`; // URL para obtener el nombre de usuario de un usuario.
    return this.http.get<string>(url, {responseType: 'text' as 'json'}); // Realiza una solicitud GET a la URL y devuelve un Observable que emite el nombre de usuario como una cadena.
  }

  // Método para obtener las direcciones de un usuario. Utiliza el método get del servicio HttpClient.
  getUserAddresses(username: string): Observable<any> {
    const url = `http://localhost:8081/api/users/username/${username}/addresses`; // URL para obtener las direcciones de un usuario.
    return this.http.get<any>(url); // Realiza una solicitud GET a la URL y devuelve un Observable que emite las direcciones obtenidas.
  }

  // Método para crear un usuario. Utiliza el método post del servicio HttpClient.
  createUser(user: CreateUser): Observable<any> {
    const url = 'http://localhost:8081/api/users/create'; // URL para crear un usuario.
    return this.http.post<User>(url, user); // Realiza una solicitud POST a la URL con el usuario a crear como cuerpo de la solicitud y devuelve un Observable que emite el usuario creado.
  }
}
