import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { HomeComponent } from './components/home/home.component';
import { AgregarComponent } from './components/clientes/agregar/agregar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from './services/clientes.service';
import { AgregarProductoComponent } from './components/productos/agregar-producto/agregar-producto.component';
import { ProductosService } from './services/productos.service';
import { PedidosService } from './services/pedidos.service';
import { ListadoPedidosComponent } from './components/pedidos/listado-pedidos/listado-pedidos.component';
import { EditarComponent } from './components/clientes/editar/editar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ProductosComponent,
    PedidosComponent,
    HomeComponent,
    AgregarComponent,
    AgregarProductoComponent,
    ListadoPedidosComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ClientesService, ProductosService, PedidosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
