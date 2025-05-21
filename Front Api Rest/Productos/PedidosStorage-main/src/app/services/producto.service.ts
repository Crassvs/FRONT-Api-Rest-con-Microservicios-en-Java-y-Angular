import { Injectable } from '@angular/core';
import { Productos } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  
  agregarLocalStorage( producto: Productos) {
    let productosAntiguos: Productos[] = this.productosLocalStorage;

    producto.productoID = productosAntiguos.length +1;
    
    productosAntiguos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productosAntiguos));
    
  }

  get productosLocalStorage(): Productos[] {
    let productosDesdeLocalStorage: Productos[] = JSON.parse( localStorage.getItem('productos'));

    if (productosDesdeLocalStorage == null){
      return new Array<Productos>();
    }
    return productosDesdeLocalStorage;
  }

  eliminarProducto(producto: Productos) {
    let productos: Productos[] = this.productosLocalStorage;
    for (let i = 0; i < productos.length; i ++) {
          if (producto.productoID === productos[i].productoID) {
            productos.splice(i, 1);    
            localStorage.setItem('productos', JSON.stringify(productos));
        }
    }
  }
}
