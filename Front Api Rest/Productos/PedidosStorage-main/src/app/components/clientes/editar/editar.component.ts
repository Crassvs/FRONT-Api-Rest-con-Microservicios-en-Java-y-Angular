import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clientes } from 'src/app/models/clientes';
import { ClientesService } from '../../../services/clientes.service';
import { IClientes } from '../../../interfaces/ICLientes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  public cliente: Clientes;
  public formData: IClientes;
  formularioAgregar: FormGroup;

  constructor( private clientesService: ClientesService,
               private router: Router,
               private route: ActivatedRoute,
               public fb: FormBuilder,
               public formBuilder: FormBuilder) {

                }


  ngOnInit(): void {
    const dato = localStorage.getItem('editCliente');

    this.formularioAgregar = this.formBuilder.group( {
      clienteID: [],
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    const data = this.clientesService.getClientebyId(+dato);
    this.formularioAgregar.setValue(data);


  }


  onSubmit() {
    this.clientesService.actualizarCliente(this.formularioAgregar.value);
    this.router.navigate(['/']);
  }

}
