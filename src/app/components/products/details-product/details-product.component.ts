import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FooterComponent} from "../../../common/footer/footer.component";
import {HeaderComponent} from "../../../common/header/header.component";
import {Product} from "../../../common/interfaces/Product";
import {ProductService} from "../../../services/product/product.service";
import {DatePipe, NgIf} from "@angular/common";
import {AppConfirmationDialogComponent} from "../../../utils/app-confirmation-dialog/app-confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

// Decorador de Componente para definir metadatos para el DetailsProductComponent.
@Component({
  selector: 'app-details-product', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    FooterComponent,
    HeaderComponent,
    DatePipe,
    NgIf,
  ],
  templateUrl: 'details-product.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: 'details-product.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase DetailsProductComponent que implementa la interfaz OnInit.
export class DetailsProductComponent implements OnInit {
  product: Product | undefined; // El producto actualmente seleccionado. Puede ser indefinido.
  cart: Product[] = []; // Una lista de productos en el carrito de compras.

  // Método constructor para la clase. Aquí se inyectan los servicios ActivatedRoute, ProductService y MatDialog.
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
  }

  // Método que se ejecuta después de que Angular ha inicializado todas las propiedades vinculadas a datos del componente.
  ngOnInit() {
    this.route.params.subscribe(params => {
      const sku = params['sku']; // Obtiene el SKU del producto de los parámetros de la ruta.
      if (sku) {
        this.loadProductDetails(sku); // Si el SKU existe, carga los detalles del producto.
      }
    });
  }

  // Método para cargar los detalles de un producto. Utiliza el método getProductDetails del servicio ProductService.
  private loadProductDetails(productId: number) {
    this.productService.getProductDetails(productId).subscribe(
      productDetails => {
        this.product = productDetails; // Establece el producto en los detalles del producto obtenidos.
      }
    );
  }

  // Método para agregar un producto al carrito de compras. Utiliza el método addToCart del servicio ProductService.
  addProductToCart(productId: number): void {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (username) {
      this.productService.addToCart(username, [productId]).subscribe(() => {
        // Actualizar el carrito
        this.productService.getCart(username).subscribe(response => {
          this.cart = response.products; // Establece el carrito en los productos obtenidos.

          this.dialog.open(AppConfirmationDialogComponent); // Abre un diálogo de confirmación.
        });
      });
    }
  }
}
