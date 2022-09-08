import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { RotasService } from 'src/app/services/rotas.service';

@Component({
  selector: 'app-listagem-rotas',
  templateUrl: './listagem-rotas.component.html',
  styleUrls: ['./listagem-rotas.component.css']
})
export class ListagemRotasComponent implements OnInit {

  rotas = new MatTableDataSource<any>();
  displayedColumns: string[];
  autoCompleteInput = new FormControl();
  autoCompleteInputDest = new FormControl();
  opcoesRotas : string[] =[];
  origemRotas : Observable<string[]>;
  origem: string;
  destino: string;
  


  @ViewChild(MatPaginator, {static:true})
  paginator: MatPaginator;    

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.rotas.sort) {this.rotas.sort = sort;}}


  constructor(private rotasService: RotasService,
              private dialog : MatDialog,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.rotasService.PegarRotas().subscribe(resultado => {
      
      
      resultado.forEach((rota) => {
        this.opcoesRotas.push(rota.origem);
      }); 

      //Carrega as Categorias com o resultado da chamada do WebService
      this.rotas.data = resultado;      
      //Vincula o Paginador com as Categorias Carregadas
      this.rotas.paginator = this.paginator;
      });


      this.displayedColumns = this.ExibirColunas();  
      this.origemRotas = this.autoCompleteInput.valueChanges.pipe(startWith(''), map((origem) => this.FiltrarNomes(origem)));
      this.origemRotas = this.autoCompleteInputDest.valueChanges.pipe(startWith(''), map((origem) => this.FiltrarNomes(origem)));
  }

  ExibirColunas(): string[] {
    return ['origem', 'destino','valor', 'acoes'];
  }


  BuscarMenorValorRota(origem:string, destino: string){
    if (origem !=null && destino !=null)
    {
      this.rotasService.BuscarMenorValorRota(origem, destino).subscribe((resultado) => {
        this.rotas.data = resultado;
      },(err) => {
        if (err.status ==400 ||err.status ==404)
        {        
          this.snackBar.open( err.error , '', {
            duration:4000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
    else {
      this.snackBar.open('Favor digitar a Origem e o Destino para a Pesquisa das Rotas', '', {
        duration:2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }
 
  FiltrarNomes(nome: string): string[] {
    if (nome.trim().length >= 4) {
      this.rotasService
        .FiltrarRota(nome.toLowerCase())
        .subscribe((resultado) => {
          this.rotas.data = resultado;
        });
    } else {
      if (nome === '') {
        this.rotasService.PegarRotas().subscribe((resultado) => {
          this.rotas.data = resultado;
        });
      }
    }
    return this.opcoesRotas.filter((funcao) =>
      funcao.toLowerCase().includes(nome.toLowerCase())
    );
  }

  AbrirDialog(id:string , origem:string, destino: string ) : void {        
    this.dialog.open(DialogExclusaoRotasComponent, {      
      data:{
        id : id,
        origem : origem,
        destino : destino
      },
    }).afterClosed().subscribe(resultado => {
      if (resultado == true){
        this.rotasService.PegarRotas().subscribe(dados => {
          this.rotas.data = dados;
          this.rotas.paginator = this.paginator;          
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }

}


@Component({
  selector:'app-dialog-exclusao-rotas',
  templateUrl: 'dialog-exclusao-rotas.html'

})
export class DialogExclusaoRotasComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private rotasService: RotasService,
  private snackBar: MatSnackBar){}

  ExcluirRota(id:number): void {        
    this.rotasService.ExcluirRota(id).subscribe(resultado =>{
      this.snackBar.open(resultado.mensagem, '', {
        duration:2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    });
  }
}


