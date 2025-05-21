import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionesComponent } from './components/regiones/regiones.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { PokemonesComponent } from './components/pokemones/pokemones.component';

const routes: Routes = [
  {path: 'cliente', component: ClientesComponent},
  {path: 'region', component: RegionesComponent},
  {path:  'movimiento', component: MovimientosComponent},
  {path: 'pokemon', component: PokemonesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
