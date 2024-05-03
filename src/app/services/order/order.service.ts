// Importando los módulos necesarios de Angular core y otros módulos locales.
import { Injectable } from '@angular/core'; // Injectable es un decorador que marca una clase como disponible para ser proporcionada e inyectada como dependencia.
import {HttpClient} from "@angular/common/http"; // HttpClient es un servicio que proporciona una forma de realizar solicitudes HTTP.
import {Observable} from "rxjs"; // Observable es una clase de RxJS que representa una secuencia de valores a lo largo del tiempo.
import {Order} from "../../common/interfaces/Order"; // Importando la interfaz Order, que define la estructura de una 'orden'.

// Decorador Injectable para marcar la clase como inyectable.
@Injectable({
  providedIn: 'root' // Esto significa que el servicio es proporcionado en el nivel de raíz y es compartido en toda la aplicación.
})
// Definiendo la clase OrderService.
export class OrderService {
  private ordersUrl = 'http://localhost:8081/api/users/'; // URL base para las solicitudes de ordenes.

  // Método constructor para la clase. Aquí se inyecta el servicio HttpClient.
  constructor(private http: HttpClient) { }

  // Método para obtener las órdenes de un usuario. Utiliza el método get del servicio HttpClient.
  getOrders(username: string): Observable<Order[]> {
    const userOrdersUrl = `${this.ordersUrl}${username}/orders`; // URL para obtener las órdenes de un usuario.
    return this.http.get<Order[]>(userOrdersUrl); // Realiza una solicitud GET a la URL y devuelve un Observable que emite una matriz de órdenes.
  }

  // Método para enviar una orden. Utiliza el método post del servicio HttpClient.
  submitOrder(username: string, order: any): Observable<any> {
    const url = `http://localhost:8081/api/users/${username}/createOrderAndClearCart`; // URL para enviar una orden.
    return this.http.post(url, order); // Realiza una solicitud POST a la URL con la orden como cuerpo de la solicitud y devuelve un Observable.
  }
}
