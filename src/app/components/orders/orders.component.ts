// Importando los módulos necesarios de Angular core, Angular common y otros módulos locales.
import {Component, OnInit} from '@angular/core'; // Component es un decorador que permite marcar una clase como un componente de Angular y proporcionar metadatos adicionales que determinan cómo se debe procesar, instanciar y usar el componente en tiempo de ejecución. OnInit es una interfaz de ciclo de vida que se invoca cuando Angular termina de inicializar los datos enlazados del componente.
import {CurrencyPipe, NgForOf} from "@angular/common"; // CurrencyPipe es un pipe que transforma un número a una cadena de texto de moneda. NgForOf es una directiva estructural que renderiza una plantilla para cada elemento en una colección.
import {Order} from '../../common/interfaces/Order'; // Importando la interfaz Order, que define la estructura de una 'orden'.
import {OrderService} from "../../services/order/order.service"; // Importando OrderService, que es presumiblemente un servicio que maneja operaciones relacionadas con 'orden'.

// Decorador de Componente para definir metadatos para el OrdersComponent.
@Component({
  selector: 'app-orders', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './orders.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: './orders.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase OrdersComponent que implementa la interfaz OnInit.
export class OrdersComponent implements OnInit {
  orders: Order[] = []; // Una lista de órdenes. Inicialmente está vacía.

  // Método constructor para la clase. Aquí se inyecta el servicio OrderService.
  constructor(
    private orderService: OrderService,
  ) {
  }

  // Método que se ejecuta después de que Angular ha inicializado todas las propiedades vinculadas a datos del componente.
  ngOnInit(): void {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (username) {
      this.orderService.getOrders(username).subscribe(orders => { // Si el nombre de usuario existe, obtiene las órdenes del servicio OrderService.
        this.orders = orders; // Establece las órdenes en las órdenes obtenidas.
      });
    }
  }
}
