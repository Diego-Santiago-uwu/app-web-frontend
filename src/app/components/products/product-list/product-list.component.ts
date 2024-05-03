import {ChangeDetectorRef, Component} from '@angular/core';
import {ProductService} from "../../../services/product/product.service";
import {HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterModule, RouterOutlet} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {filter} from "rxjs";
import {Product} from "../../../common/interfaces/Product";
import {MatDialog} from "@angular/material/dialog";
import {AppConfirmationDialogComponent} from "../../../utils/app-confirmation-dialog/app-confirmation-dialog.component";

// Decorador de Componente para definir metadatos para el ProductListComponent.
@Component({
  selector: 'app-product-list', // El selector CSS que identifica este componente en una plantilla.
  standalone: true, // Esta propiedad no es estándar en Angular. Podría ser una propiedad personalizada o un error tipográfico.
  imports: [ // El conjunto de NgModules cuyos declarables exportados están disponibles para las plantillas en este módulo.
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './product-list.component.html', // La URL del archivo de plantilla para este componente.
  styleUrl: '../../../app.component.css' // La URL del archivo de estilo para este componente. Debería ser styleUrls en lugar de styleUrl.
})
// Definiendo la clase ProductListComponent.
export class ProductListComponent {
  products: Product[] = []; // Una lista de productos. Inicialmente está vacía.
  cart: Product[] = []; // Una lista de productos en el carrito de compras.

  // Método constructor para la clase. Aquí se inyectan los servicios ProductService, Router, ActivatedRoute, ChangeDetectorRef y MatDialog.
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Solo reacciona a los eventos NavigationEnd
    ).subscribe(() => this.loadProducts());
  }

  // Método que se ejecuta después de que Angular ha inicializado todas las propiedades vinculadas a datos del componente.
  ngOnInit() {
    this.loadProducts();
  }

  // Método para cargar los productos. Utiliza el método getProductCategory del servicio ProductService.
  loadProducts() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      const subCategoryName = params['subcategory'];
      console.log('Category:', categoryName, 'Subcategory:', subCategoryName);

      this.productService.getProductCategory(categoryName, subCategoryName).subscribe(
        data => {
          console.log('Products:', data); // Imprime los productos en la consola.
          this.products = data;
          this.productService.setCurrentProducts(data); // Establece los productos actuales en el servicio.
          this.changeDetector.detectChanges();  // Desencadena manualmente la detección de cambios.
        }
      );
    });

    // Suscríbete a los productos actuales en el servicio.
    this.productService.currentProducts$.subscribe(
      data => {
        if (data) {
          this.products = data;
          this.changeDetector.detectChanges();  // Desencadena manualmente la detección de cambios.
        }
      }
    );
  }

  // Método para listar los productos. Utiliza el método getProductList del servicio ProductService.
  private listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  // Método para ir a los detalles del producto. Utiliza el método getProductDetails del servicio ProductService.
  goToProductDetails(product: number) {
    this.productService.getProductDetails(product).subscribe(productDetails => {
      // Aquí puedes hacer algo con los detalles del producto si es necesario antes de la navegación
      console.log("LOG", productDetails);
      this.router.navigate(['/product-details', product]);
    });
  }

  // Método para agregar un producto al carrito de compras. Utiliza el método addToCart del servicio ProductService.
  addProductToCart(productId: number): void {
    const username = localStorage.getItem('username'); // Obtiene el nombre de usuario del almacenamiento local.
    if (username) {
      this.productService.addToCart(username, [productId]).subscribe(() => {
        // Actualizar el carrito
        this.productService.getCart(username).subscribe(response => {
          this.cart = response.products;
          // Abrir el diálogo de confirmación
          this.dialog.open(AppConfirmationDialogComponent);
        });
      });
    }
  }
}
