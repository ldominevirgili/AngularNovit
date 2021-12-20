import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service'; 


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  formValues: FormGroup;

  constructor(
        fb: FormBuilder,
        private UsuarioService: UsuarioService
    ) {
    this.formValues = fb.group({
      idUsuario: [0, Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      estado: [''],
      
    });
  }

  UsuarioList: any = [];
  isEditing: boolean = false;

  ngOnInit(): void {
    this.getAllUsuarios();
  }

  delete(idUsuario: number): void {
    console.log('Libero el usuario', idUsuario);
    this.UsuarioService.delete(idUsuario).subscribe({next: () => {
      this.getAllUsuarios();
    },
    error: (error: { status: number; }) => {
      if (error.status === 401){
        window.alert('Error de autenticación con el servidor.');
      }
      else if (error.status === 400)
      {
        window.alert('Error de parametros incorrectos.');
      }
      else{
        window.alert('Error desconocido.');
        console.log(error)
      }
    }
  })
  }


  edit(idUsuario: number) {
    console.log('Modifico el Usuario', idUsuario);

   
    this.isEditing = true;

  
    let Usuario = this.UsuarioList.find((u: any) => u.idUsuario === idUsuario);

    
    
    this.formValues.controls['idUsuario'].setValue(Usuario.idUsuario);
    this.formValues.controls['nombre'].setValue(Usuario.nombre);
    this.formValues.controls['apellido'].setValue(Usuario.apellido);
    this.formValues.controls['username'].setValue(Usuario.username);
    this.formValues.controls['password'].setValue(Usuario.password);
    this.formValues.controls['email'].setValue(Usuario.email);
    this.formValues.controls['estado'].setValue(Usuario.estado);
  }

  submit() {
    if (this.formValues.status === 'VALID') {
      let aUsuario = new Usuario();

      aUsuario.idUsuario = this.formValues.get('idUsuario')?.value;
      aUsuario.nombre = this.formValues.get('nombre')?.value;
      aUsuario.apellido = this.formValues.get('apellido')?.value;
      aUsuario.username = this.formValues.get('username')?.value;
      aUsuario.password = this.formValues.get('password')?.value;
      aUsuario.email = this.formValues.get('email')?.value;

      if (aUsuario.idUsuario != 0)
      {
        this.UsuarioService.updateUsuario(aUsuario).subscribe({
          next: later => {
            this.getAllUsuarios();
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
      else{
        let usuarioNuevo= {
          idUsuario: this.formValues.get('idUsuario')?.value,
          nombre: this.formValues.get('nombre')?.value,
          apellido: this.formValues.get('apellido')?.value,
          username: this.formValues.get('username')?.value,
          password: this.formValues.get('password')?.value,
          email: this.formValues.get('email')?.value,
          estado: this.formValues.get('estado')?.value
        }
        this.UsuarioService.createUsuario(usuarioNuevo).subscribe({
          next: later => {
            this.getAllUsuarios();
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

  getAllUsuarios(){
    this.UsuarioService.getUsuario().subscribe(
      Usuario => this.UsuarioList = Usuario
    );
  }
}
