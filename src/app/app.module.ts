import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CreateRecursoComponent } from './components/create-recurso/create-recurso.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { SidenavComponent } from './components/sidebar/sidenav.component';
import { CreateRolComponent } from './components/create-rol/create-rol.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RecursoService } from './services/recurso.service';
import { UsuarioService } from './services/usuario.service';
import { RolService } from './services/rol.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    CreateRecursoComponent,
    CreateUserComponent,
    SidenavComponent,
    CreateRolComponent,
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  exports:[
    
  ],
  providers: [
    RecursoService,
    RolService,
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
