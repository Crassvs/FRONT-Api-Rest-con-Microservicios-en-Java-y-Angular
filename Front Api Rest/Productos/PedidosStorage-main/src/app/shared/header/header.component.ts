import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidosService } from '../../services/pedidos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  listadoPedidos: Pedido[] = new Array<Pedido>();
  total: number;

  constructor(public pedidosService: PedidosService) { }

  ngOnInit(): void {
    this.pedidosService.pedido.nombreCliente;
    this.total = this.pedidosService.contarCantidad();
    // console.log(this.total);
    this.obtenerPedidos();
  }

  
  obtenerPedidos() {
    this.listadoPedidos = this.pedidosService.listadoPedidosLocalStorage;
  }


}
