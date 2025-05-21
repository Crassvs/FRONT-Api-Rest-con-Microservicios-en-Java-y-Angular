import { Injectable } from '@angular/core';
import { IClientes } from '../interfaces/ICLientes';
import { Clientes } from '../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor() { 
    
  }
  clientesA: Clientes[] = this.clientesLocalStorage;

  
  agregarLocalStorage( cliente: Clientes) {
    let clientesAntiguos: Clientes[] = this.clientesLocalStorage;

    cliente.clienteID = clientesAntiguos.length + 1;
    
    clientesAntiguos.push(cliente);

    localStorage.setItem('clientes', JSON.stringify(clientesAntiguos));
    
  }

  get clientesLocalStorage(): Clientes[] {
    let clientesDesdeLocalStorage: Clientes[] = JSON.parse( localStorage.getItem('clientes'));

    if (clientesDesdeLocalStorage == null){
      return new Array<Clientes>();
    }
    return clientesDesdeLocalStorage;
  }

  actualizarCliente(cliente: Clientes): void {
    const clientesAntiguos: Clientes[]  = this.clientesLocalStorage;

    const itemIndex = this.clientesA.findIndex(item => item.clienteID === cliente.clienteID);
    this.clientesA[itemIndex] = cliente;

    const clienteTemp = {
      ...cliente
    };

    clientesAntiguos.push(clienteTemp);

    localStorage.setItem('clientes', JSON.stringify(clientesAntiguos));


    // const itemIndex = this.clientesA.findIndex(item => item.clienteID === cliente.clienteID);
    // this.clientesA[itemIndex] = cliente;

    // const newCliente = Array<Clientes>({
    //   ...cliente
    // });

    // localStorage.setItem('clientes', JSON.stringify(newCliente));
  }

  eliminarCliente(cliente: Clientes) {
    let clientesA: Clientes[] = this.clientesLocalStorage;
    for (let i = 0; i < clientesA.length; i ++) {
          if (cliente.clienteID === clientesA[i].clienteID) {
            clientesA.splice(i, 1);
          localStorage.setItem('clientes', JSON.stringify(clientesA));
        }
    }
  }

  getClientebyId(id: number) {
    // console.log(id);
    const itemIndex = this.clientesA.findIndex(cliente => cliente.clienteID === id);
    // console.log(itemIndex);
    return this.clientesA[itemIndex];
  }

  // getnextId(): number {
  //   let highest = 0;
  //   this.clientesA.forEach(function (item) {
  //     if (highest === 0) {
  //       highest = item.clienteID;
  //     }
  //     if (highest < item.clienteID) {
  //       highest = item.clienteID;
  //     }
  //   });
  //   return highest + 1;
  // }


}
