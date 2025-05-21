import { Component, OnInit } from '@angular/core';
import { IClientes } from '../../interfaces/ICLientes';
import { IProductos } from '../../interfaces/IProductos';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

   clientes: Array<IClientes> = new Array<IClientes>();
  constructor() { }

  ngOnInit(): void {

  }



}
