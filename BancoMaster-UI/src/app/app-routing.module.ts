import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarRotaComponent } from './componentes/Rota/atualizar-rota/atualizar-rota.component';
import { ListagemRotasComponent } from './componentes/Rota/listagem-rotas/listagem-rotas.component';
import { NovaRotaComponent } from './componentes/Rota/nova-rota/nova-rota.component';


const routes: Routes = [
  {
    path : 'Rotas/listagemrotas',component: ListagemRotasComponent
  }, 
  {
    path : 'Rotas/novarota',component: NovaRotaComponent
  },   
  {
    path : 'Rotas/atualizarrota/:id',component: AtualizarRotaComponent
  },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
