// Importando los módulos necesarios de Angular core y otros módulos locales.
import {Injectable} from '@angular/core'; // Injectable es un decorador que marca una clase como disponible para ser proporcionada e inyectada como dependencia.
import {HttpClient} from '@angular/common/http'; // HttpClient es un servicio que proporciona una forma de realizar solicitudes HTTP.
import {Product} from "../../common/interfaces/Product"; // Importando la interfaz Product, que define la estructura de un 'producto'.
import {BehaviorSubject, Observable, tap} from "rxjs"; // BehaviorSubject es una clase de RxJS que representa un valor que puede cambiar con el tiempo. Observable es una clase de RxJS que representa una secuencia de valores a lo largo del tiempo. tap es un operador de RxJS que realiza una acción secundaria con cada valor del Observable.
import {map} from "rxjs/operators"; // map es un operador de RxJS que aplica una función a cada valor emitido por un Observable.
import {Cart} from "../../common/interfaces/Cart"; // Importando la interfaz Cart, que define la estructura de un 'carrito de compras'.

// Decorador Injectable para marcar la clase como inyectable.
@Injectable({
  providedIn: 'root' // Esto significa que el servicio es proporcionado en el nivel de raíz y es compartido en toda la aplicación.
})
// Definiendo la clase ProductService.
export class ProductService {
  private productBaseUrl = 'http://localhost:8081/product'; // URL base para las solicitudes de productos.

  private findByProductId = `${this.productBaseUrl}/search/findByproductId?productId=`; // URL para encontrar un producto por su ID.
  private findBySku = `${this.productBaseUrl}/search/findBySku?sku=`; // URL para encontrar un producto por su SKU.
  private findByCategoryUrl = `${this.productBaseUrl}/search/findByCategoryNameIncludingSubcategories?categoryName=`; // URL para encontrar productos por su categoría.

  currentProducts: Product[] | undefined; // Los productos actuales. Puede ser indefinido.

  // Método constructor para la clase. Aquí se inyecta el servicio HttpClient.
  constructor(private httpClient: HttpClient) { }

  private currentProductsSubject = new BehaviorSubject<Product[]>([]); // Un BehaviorSubject que emite la lista actual de productos.
  currentProducts$ = this.currentProductsSubject.asObservable(); // Un Observable que emite la lista actual de productos.

  // Método para obtener la lista de productos. Utiliza el método get del servicio HttpClient.
  getProductList(): Observable<Product[]> {
    const searchUrl = `${this.productBaseUrl}`; // URL para obtener la lista de productos.
    return this.httpClient.get<Product[]>(searchUrl).pipe(
      tap(products => this.currentProducts = products) // Actualiza los productos actuales con los productos obtenidos.
    );
  }

  // Método para obtener los productos actuales.
  getCurrentProducts(): Product[] | undefined {
    return this.currentProducts; // Devuelve los productos actuales.
  }

  // Método para establecer los productos actuales.
  setCurrentProducts(products: Product[]) {
    this.currentProductsSubject.next(products); // Emite los productos proporcionados como los productos actuales.
  }

  // Método para obtener los detalles de un producto. Utiliza el método get del servicio HttpClient.
  getProductDetails(productId: number): Observable<Product> {
    const searchUrl = `${this.findByProductId}${productId}`; // URL para obtener los detalles de un producto.
    return this.httpClient.get<Product>(searchUrl); // Realiza una solicitud GET a la URL y devuelve un Observable que emite el producto obtenido.
  }

  // Método para obtener productos por categoría. Utiliza el método get del servicio HttpClient.
  getProductCategory(categoryName: string, subcategoryName?: string): Observable<Product[]> {
    let searchUrl = `${this.findByCategoryUrl}${subcategoryName ? subcategoryName : categoryName}`; // URL para obtener productos por categoría.
    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      tap(response => console.log('API Response:', response)), // Imprime la respuesta de la API en la consola.
      map(response => response._embedded.product) // Mapea la respuesta a la lista de productos obtenidos.
    );
  }

  // Método para obtener el carrito de un usuario. Utiliza el método get del servicio HttpClient.
  getCart(username: string): Observable<Cart> {
    const url = `http://localhost:8081/api/users/username/${username}/cart`; // URL para obtener el carrito de un usuario.
    return this.httpClient.get<Cart>(url); // Realiza una solicitud GET a la URL y devuelve un Observable que emite el carrito obtenido.
  }

  // Método para eliminar un producto del carrito de un usuario. Utiliza el método delete del servicio HttpClient.
  removeFromCart(userId: number, productId: number): Observable<any> {
    const url = `http://localhost:8081/api/carts/${userId}/products/${productId}`; // URL para eliminar un producto del carrito de un usuario.
    return this.httpClient.delete(url); // Realiza una solicitud DELETE a la URL y devuelve un Observable.
  }

  // Método para agregar productos al carrito de un usuario. Utiliza el método post del servicio HttpClient.
  addToCart(username: string, productIds: number[]): Observable<any> {
    const url = `http://localhost:8081/api/carts/username/${username}`; // URL para agregar productos al carrito de un usuario.
    const body = {
      productIds: productIds // El cuerpo de la solicitud es un objeto que contiene la lista de IDs de los productos a agregar.
    };
    return this.httpClient.post(url, body); // Realiza una solicitud POST a la URL con el cuerpo de la solicitud y devuelve un Observable.
  }
}

// Interfaz para la respuesta de la API al obtener productos por categoría.
interface GetResponse {
  _embedded: {
    product: Product[]; // La lista de productos obtenidos.
  }
}
