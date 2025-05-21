import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { RegionesComponent } from './components/regiones/regiones.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { PokemonesComponent } from './components/pokemones/pokemones.component';
import { provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ClientesComponent,
    RegionesComponent,
    MovimientosComponent,
    PokemonesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
