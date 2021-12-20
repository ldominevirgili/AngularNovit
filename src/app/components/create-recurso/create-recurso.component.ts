import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recurso } from 'src/app/models/recurso';
import { RecursoService } from 'src/app/services/recurso.service';


@Component({
  selector: 'app-create-recurso',
  templateUrl: './create-recurso.component.html',
  styleUrls: ['./create-recurso.component.css']
})
export class CreateRecursoComponent implements OnInit {

  formValues: FormGroup;
  loading: boolean = true;

  constructor(
        fb: FormBuilder,
        private RecursoService: RecursoService
    ) {
    this.formValues = fb.group({
      idRecurso: [0, Validators.required],
      nombre: ['', Validators.required],
      estado: [''],
      
    });
  }

  RecursoList: any = [];
  isEditing: boolean = false;

  ngOnInit(): void {
    this.getAllRecursos();
  }

  
  delete(idRecurso: number) {
    console.log('Libero el rol', idRecurso);
    this.RecursoService.delete(idRecurso).subscribe({next: () => {
      this.getAllRecursos();
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


  edit(idRecurso: number) {
    console.log('Modifico el recurso ', idRecurso);

   
    this.isEditing = true;

  
    let Recurso = this.RecursoList.find((r: any) => r.idRecurso === idRecurso);

    
    
    this.formValues.controls['idRecurso'].setValue(Recurso.idRecurso);
    this.formValues.controls['nombre'].setValue(Recurso.nombre);
    this.formValues.controls['estado'].setValue(Recurso.estado);
  }

  submit() {
    if (this.formValues.status === 'VALID') {
      let nRecurso = new Recurso();

      nRecurso.idRecurso = this.formValues.get('idRecurso')?.value;
      nRecurso.nombre = this.formValues.get('nombre')?.value;
      nRecurso.estado = this.formValues.get('estado')?.value;
      

      if (nRecurso.idRecurso != 0)
      {
        this.RecursoService.updateRecurso(nRecurso).subscribe({
          next: () => {
            this.getAllRecursos();
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
        let recursoNuevo= {
          idRecurso: this.formValues.get('idRecurso')?.value,
          nombre: this.formValues.get('nombre')?.value,
          estado: this.formValues.get('estado')?.value
        }
        this.RecursoService.createRecurso(recursoNuevo).subscribe({
          next: later => {
            this.getAllRecursos();
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

  getAllRecursos(){
    this.RecursoService.getRecurso().subscribe(
      Recurso =>{ 
        this.RecursoList = Recurso;
       //this.loading=false
      });
  }
}
