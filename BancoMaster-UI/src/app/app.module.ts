//Modulos Core do Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import {MatTableModule} from '@angular/material/table';
import { ListagemRotasComponent } from './componentes/Rota/listagem-rotas/listagem-rotas.component';
import { AtualizarRotaComponent } from './componentes/Rota/atualizar-rota/atualizar-rota.component';
import { RotasService } from './services/rotas.service';
import { NovaRotaComponent } from './componentes/Rota/nova-rota/nova-rota.component';
import { DialogExclusaoRotasComponent } from './componentes/Rota/listagem-rotas/listagem-rotas.component';


@NgModule({
  declarations: [
    AppComponent,ListagemRotasComponent, AtualizarRotaComponent, NovaRotaComponent, DialogExclusaoRotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, BrowserAnimationsModule,MatCardModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatDividerModule, MatSelectModule, MatGridListModule, MatDialogModule, FormsModule, MatAutocompleteModule,
    MatPaginatorModule, MatSortModule, MatSnackBarModule, MatProgressBarModule, MatIconModule, MatButtonModule, 
    FlexLayoutModule, NgxMaskModule, MatTableModule
    
  ],
  providers: [RotasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
