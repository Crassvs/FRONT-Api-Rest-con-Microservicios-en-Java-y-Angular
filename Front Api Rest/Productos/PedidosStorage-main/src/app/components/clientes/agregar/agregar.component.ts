import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IClientes } from 'src/app/interfaces/ICLientes';
import { Clientes } from '../../../models/clientes';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  formularioAgregar: FormGroup;
  cliente: IClientes = new IClientes();
  formData: Clientes;
  constructor(private fb: FormBuilder,
              public clientesService: ClientesService) {
               this.formData = {
                  clienteID: null,
                  nombre: null,
                  apellido: null,
                  direccion: null,
               }
  }

  @Output()


  ngOnInit(): void {
    this.formularioAgregar = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  agregar() {
    this.cliente = this.formularioAgregar.value as Clientes;
    this.clientesService.agregarLocalStorage(this.cliente);
    this.formularioAgregar.reset();
  }

}
