import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  formValues: FormGroup;

  constructor(
        fb: FormBuilder,
        private RolService: RolService
    ) {
    this.formValues = fb.group({
      idRol: [0, Validators.required],
      nombre: ['', Validators.required],
      estado: [false],
      
    });
  }

  RolList: any = [];
  isEditing: boolean = false;

  ngOnInit(): void {
    this.getAllRols();
  }

  delete(idRol: number) {
    console.log('Libero el usuario', idRol);
    this.RolService.deleteRol(idRol).subscribe({next: () => {
      this.getAllRols();
    },
    error: (error: { status: number; }) => {
      if (error.status === 401){
        window.alert('Error de autenticación con el servidor.');
      }
      else if (error.status === 400)
      {
        window.alert('Error de parametros incorrectos.');
      }
      else
        window.alert('Error desconocido.');
    }
  })
  }

  edit(idRol: number) {
    console.log('Modifico el rol', idRol);

   
    this.isEditing = true;

  
    let Rol = this.RolList.find((r: any) => r.idRol === idRol);

    
    
    this.formValues.controls['idRol'].setValue(Rol.idRol);
    this.formValues.controls['nombre'].setValue(Rol.nombre);
    this.formValues.controls['estado'].setValue(Rol.estado);
  }

  submit() {
    console.log(this.formValues.status)
    if (this.formValues.status === 'VALID') {
      let nRol = new Rol();

      nRol.idRol = this.formValues.get('idRol')?.value;
      nRol.nombre = this.formValues.get('nombre')?.value;
      nRol.estado = this.formValues.get('estado')?.value;
      


      if (nRol.idRol != 0)
      {
        this.RolService.updateRol(nRol).subscribe({
          next: () => {
            this.getAllRols();
          },
          error: (error: { status: number; }) => {
            if (error.status === 401){
              window.alert('Error de autenticación con el servidor.');
            }
            else if (error.status === 400)
            {
              window.alert('Error de parametros incorrectos.');
            }
            else
              window.alert('Error desconocido.');
          }
        });
      }
      else{
        let rolNuevo= {
          idRol: this.formValues.get('idRol')?.value,
          nombre: this.formValues.get('nombre')?.value,
          estado: this.formValues.get('estado')?.value
        }
        this.RolService.createRol(rolNuevo).subscribe({
          next: later => {
            this.getAllRols();
          },
          error: error => {
            if (error.status === 401){
              window.alert('Error de autenticación con el servidor.');
            }
            else if (error.status === 400)
            {
              window.alert('Error de parametros incorrectos.');
            }
            else
              window.alert('Error desconocido.');
          }
        });
      }

      this.isEditing = false;
      this.formValues.reset({});

    } else
      window.alert('Debe completar todos los campos');
  }

  cancelEdit() {
    this.isEditing = false;
    this.formValues.reset();
  }

  getAllRols(){
    this.RolService.getRol().subscribe(
      Rol => this.RolList = Rol
    );
  }
}