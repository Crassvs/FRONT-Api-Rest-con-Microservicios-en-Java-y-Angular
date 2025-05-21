import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl:string = environment.apiUrl + 'cliente/';

  constructor(private http:HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  postClientes(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  putClientes(cliente: Cliente): Observable<Cliente>{
    //return this.http.put<Cliente>(this.apiUrl + cliente.id ,cliente);
    return this.http.put<Cliente>(`${this.apiUrl}${cliente.id}` ,cliente);
    
  }

    deleteCliente(idCliente: number): Observable<Cliente>{
    //return this.http.put<Cliente>(this.apiUrl + cliente.id ,cliente);
    return this.http.delete<Cliente>(`${this.apiUrl}${idCliente}`);
    
  }
}