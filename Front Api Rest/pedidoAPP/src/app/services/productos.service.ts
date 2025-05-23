import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl: string = environment.apiUrl + 'producto/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  postProductos(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  putProductos(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}${producto.id}`, producto);
  }

  deleteProducto(idProducto: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.apiUrl}${idProducto}`);
  }
}