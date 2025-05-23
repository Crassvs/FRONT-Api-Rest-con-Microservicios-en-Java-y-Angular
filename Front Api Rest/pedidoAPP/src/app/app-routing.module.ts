import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const routes: Routes = [
  {path: 'cliente', component: ClientesComponent},
  {path:  'producto', component: ProductosComponent},
  {path: 'pedido', component: PedidosComponent},
  { path: 'pedidos/:idCliente', component: PedidosComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
