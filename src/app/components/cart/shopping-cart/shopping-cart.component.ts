import {ChangeDetectorRef, Component} from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {Cart} from "../../../common/interfaces/Cart";
import {Product} from "../../../common/interfaces/Product";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {UserService} from "../../../services/user/user.service";
import { Address } from '../../../common/interfaces/Address';
import {OrderService} from "../../../services/order/order.service";
import { RouterModule } from '@angular/router';
import {AppConfirmationDialogComponent} from "../../../utils/app-confirmation-dialog/app-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

// Decorador de Componente para definir metadatos para el ShoppingCartComponent.
@Component({
  selector: 'app-shopping-cart', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    NgForOf,
    CurrencyPipe,
    RouterModule
  ],
  templateUrl: './shopping-cart.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: './shopping-cart.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase ShoppingCartComponent.
export class ShoppingCartComponent {
  cart: Product[] = []; // Una lista de productos en el carrito de compras.
  address: Address | undefined; // La dirección de envío del usuario. Puede ser indefinida.

  totalPrice: number = 0; // El precio total de los productos en el carrito de compras.

  // Método constructor para la clase. Aquí se inyectan los servicios ProductService, Router, ActivatedRoute, ChangeDetectorRef, UserService, OrderService y MatDialog.
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private userService: UserService,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  // Método que se ejecuta después de que Angular ha inicializado todas las propiedades vinculadas a datos del componente.
  ngOnInit() {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (username) {
      this.productService.getCart(username).subscribe(response => { // Si el nombre de usuario existe, obtiene el carrito de compras del servicio ProductService.
        this.cart = response.products; // Establece el carrito en los productos obtenidos.
        this.calculateTotalPrice(); // Calcula el precio total.
      });

      this.userService.getUserAddresses(username).subscribe(response => { // Obtiene las direcciones del usuario del servicio UserService.
        if (response.length > 0) {
          this.address = response[0]; // Establece la dirección en la primera dirección obtenida.
          console.log("this address: ", this.address); // Imprime la dirección en la consola.
        }
      });
    }
  }

  // Método para eliminar un producto del carrito de compras. Utiliza el método removeFromCart del servicio ProductService.
  removeProduct(productId: number): void {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (username) {
      this.productService.removeFromCart(3, productId).subscribe(() => { // Si el nombre de usuario existe, elimina el producto del carrito de compras.
        this.cart = this.cart.filter(product => product.productId !== productId); // Filtra el producto eliminado del carrito.
        this.calculateTotalPrice(); // Recalcula el precio total.
      });
    }
  }

  // Método para calcular el precio total de los productos en el carrito de compras.
  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, currentProduct) => sum + currentProduct.unitPrice, 0); // Suma el precio de cada producto en el carrito.
  }

  // Método para enviar una orden. Utiliza el método submitOrder del servicio OrderService.
  submitOrder(): void {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (username) {
      this.orderService.submitOrder(username, {}).subscribe({
        next: response => {
          console.log('Order submitted successfully:', response); // Imprime el mensaje de éxito en la consola.
          // Navega a la misma URL para recargar la página
          this.router.navigateByUrl('/orders', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/orders']);
          });

          this.dialog.open(AppConfirmationDialogComponent); // Abre un diálogo de confirmación.
        },
        error: error => {
          console.error('Error submitting order:', error); // Imprime el error en la consola.
        }
      });
    }
  }
}
