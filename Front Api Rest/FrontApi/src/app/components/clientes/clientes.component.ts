import { Component } from '@angular/core';

import { ClientesService } from '../../services/clientes.service';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente.models';


@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  clientes: Cliente[] = [];
  showForm:boolean = false;
  textoModal: string = 'Nuevo cliente';
  clienteForm: FormGroup;
  isEditMode: boolean = false;
  selectedCliente: Cliente | null = null;

  constructor(private clienteService: ClientesService,
    private formBuilder: FormBuilder
  ){
    this.clienteForm = formBuilder.group({
      id:[null],
      nombre:['',[Validators.required, Validators.maxLength(50)]],
      apellido:['',[Validators.required, Validators.maxLength(50)]],
      email:['', [Validators.required,Validators.maxLength(50),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      telefono:['',[Validators.required, Validators.maxLength(50)]],
      direccion:['',[Validators.required, Validators.maxLength(50)]]

    })
  }

  ngOnInit(){
    this.listarClientes();

  }
listarClientes(){
   this.clienteService.getClientes().subscribe({
     next: resp => {
       this.clientes = resp;
      
     }
   });
  }
  onSubmit(): void{
    if(this.clienteForm.invalid){
      return;
    }
    const clienteData: Cliente = this.clienteForm.value;
    if(this.isEditMode){
      this.clienteService.putClientes(clienteData).subscribe({
        next: updateCliente => {
          const index = this.clientes.findIndex(c => c.id === clienteData.id);
          if(index !== -1){
            this.clientes[index] = updateCliente;
          }
          Swal.fire({
           title: 'Cliente ' + updateCliente.nombre + ' actualizado',
           text: 'El cliente ha sido actualizado correctamente',
            icon: 'success',
          })
          this.showForm = false;
          this.clienteForm.reset();
        }
        })
    }else{
      this.clienteService.postClientes(clienteData).subscribe({
        next:newCliente =>{
          this.clientes.push(newCliente);
          Swal.fire({
            title: 'Cliente ' + newCliente.nombre + ' creado',
            text: 'El cliente fue creado correctamente',
            icon: 'success',
          })
          this.showForm = false;
          this.clienteForm.reset();
        }
      })

    }
  }
  toggleForm(): void{
    this.showForm = !this.showForm;
    this.textoModal = 'Nuevo cliente';
    this.isEditMode = false;
    this.clienteForm.reset();
    this.selectedCliente = null;
  }
  editCliente(cliente: Cliente): void{
    this.selectedCliente = cliente;
    this.textoModal = 'Editando cliente' + cliente.nombre;
    this.isEditMode = true;
    this.showForm = true;
    /*this.clienteForm.patchValue({
      id: cliente.id,
      nombre: cliente.nombre
    });*/
    this.clienteForm.patchValue({
      ...cliente
    });
  }

  deleteCliente(idCliente: number): void{
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      text: 'Eliminar Cliente',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if(resp.isConfirmed){
      this.clienteService.deleteCliente(idCliente).subscribe({
        next: deletedCliente => {
          this.clientes = this.clientes.filter(c => c.id !== idCliente);
          Swal.fire({
            title: 'Cliente ' + deletedCliente.nombre + ' eliminado',
            text: 'El cliente fue eliminado',
            icon: 'success'
            })
          }
        })
      }
    })
  }
}