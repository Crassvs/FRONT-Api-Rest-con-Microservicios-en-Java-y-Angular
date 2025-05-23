import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoGet } from '../models/pedidoGet.models';
import { PedidoPost } from '../models/pedidoPost.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl: string = environment.apiUrl + 'pedido/';

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<PedidoGet[]> {
  return this.http.get<PedidoGet[]>(this.apiUrl + 'get');
}

  postPedido(pedido: PedidoPost): Observable<PedidoPost> {
    return this.http.post<PedidoPost>(this.apiUrl, pedido);
  }

  putPedido(pedido: PedidoPost): Observable<PedidoGet> {
  return this.http.put<PedidoGet>(`${this.apiUrl}${pedido.id}`, pedido);
}

  deletePedido(idPedido: number): Observable<PedidoPost> {
    return this.http.delete<PedidoPost>(`${this.apiUrl}${idPedido}`);
  }
}
