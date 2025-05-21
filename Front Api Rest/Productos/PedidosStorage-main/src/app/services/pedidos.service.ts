import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { Productos } from '../models/producto.model';
import { PedidoDetalle } from '../models/pedido-detalle';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  pedido: Pedido = new Pedido();
  constructor() { 
    this.pedido = this.ultimoPedido;
  }

  guardarLocalStorage() {
    localStorage.setItem('ultimoPedido', JSON.stringify(this.pedido));
  }

  get ultimoPedido(): Pedido {
    // let pedidoDeLocalStorage: Pedido = new Pedido();
    // let pedido = JSON.parse( localStorage.getItem('ultimoPedido'));

    // pedidoDeLocalStorage.total = pedido.total;
    // pedidoDeLocalStorage.pedidoDetalle = pedido.pedidoDetalle;
    // pedidoDeLocalStorage.nombreCliente = pedido.nombreCliente;
    let pedidoDeLocalStorage: Pedido = new Pedido(JSON.parse( localStorage.getItem('ultimoPedido')));


    if (pedidoDeLocalStorage === null) {
      return new Pedido;
    }
    return pedidoDeLocalStorage;
  }


  contarCantidad(): number {
    return this.ultimoPedido.pedidoDetalle.filter(pedido => pedido.cantidad).length;
  }

  guardarPedido() {
    let listadoPedidos: Pedido[] = new Array<Pedido>();
    listadoPedidos = this.listadoPedidosLocalStorage;
    this.pedido.pedidoID = listadoPedidos.length + 1;
    listadoPedidos.push(this.pedido);
    localStorage.setItem('pedidos', JSON.stringify(listadoPedidos) );
    localStorage.removeItem('ultimoPedido');
    this.pedido = new Pedido(null);
  }


  get listadoPedidosLocalStorage(): Pedido[] {
    let pedidos: Pedido[] = JSON.parse( localStorage.getItem('pedidos') );
    if (pedidos === null) {
      return new Array<Pedido>();
    }
    return pedidos.sort((a,b) => b.pedidoID - a.pedidoID);
  }

  eliminarPedidos(pedido: Pedido) {
    let pedidosArreglo: Pedido[] = JSON.parse( localStorage.getItem('pedidos') );
    console.log(pedidosArreglo);
    for (let i = 0; i < pedidosArreglo.length; i++) {
      if (pedido.pedidoID === pedidosArreglo[i].pedidoID) {
        pedidosArreglo.splice(i, 1);
        localStorage.setItem('pedidos', JSON.stringify(pedidosArreglo));
      }
    }
  }

}
