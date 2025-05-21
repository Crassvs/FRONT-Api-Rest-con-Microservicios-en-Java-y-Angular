import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { HomeComponent } from './components/home/home.component';
import { AgregarComponent } from './components/clientes/agregar/agregar.component';
import { AgregarProductoComponent } from './components/productos/agregar-producto/agregar-producto.component';
import { ListadoPedidosComponent } from './components/pedidos/listado-pedidos/listado-pedidos.component';
import { EditarComponent } from './components/clientes/editar/editar.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'productos', component: ProductosComponent},
  { path: 'agregar-producto', component: AgregarProductoComponent},
  { path: 'pedidos', component: PedidosComponent},
  { path: 'listado-pedidos', component: ListadoPedidosComponent},
  { path: 'agregar-Cliente', component: AgregarComponent},
  { path: 'editar-Cliente/:id/editar', component: EditarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
