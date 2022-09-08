import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RotasService } from 'src/app/services/rotas.service';

@Component({
  selector: 'app-atualizar-rota',
  templateUrl: './atualizar-rota.component.html',
  styleUrls: ['../listagem-rotas/listagem-rotas.component.css']
})
export class AtualizarRotaComponent implements OnInit {

  formulario: any;  
  erros:string[]; 
  Id: number;      
  descricao : string;

  constructor(private rotasService: RotasService,
              private router : Router,  
              private snackBar : MatSnackBar,    
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.erros = [];   
    this.Id =  this.route.snapshot.params['id'];
    
    this.rotasService.PegarRotaPeloId(this.Id).subscribe(resultado => {
      this.descricao = resultado.origem + " - " + resultado.destino;
      this.formulario = new FormGroup({      
        origem: new FormControl(resultado.origem, [Validators.required,Validators.minLength(1), Validators.maxLength(10)]),
        destino: new FormControl(resultado.destino,[Validators.required,Validators.minLength(1), Validators.maxLength(10)]),
        valor: new FormControl(resultado.valor, [Validators.required]),    
        id: new FormControl(this.Id)}
    )});

  }

  get propriedade(){
    return this.formulario.controls;
  }

  VoltarListagem():void {
    this.router.navigate(['Rotas/listagemrotas']);      
  }  

  EnviarFormulario():void{
    this.erros = [];    
    const rotas = this.formulario.value;    
    this.rotasService.AtualizarRota(this.Id, rotas).subscribe((resultado) => {
      this.router.navigate(['Rotas/listagemrotas']);      
      this.snackBar.open(resultado.mensagem, '',
        {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });  
    },(err) => {
      if (err.status ==400)
      {        
        for(const campo in err.error.errors){
          if (err.error.errors.hasOwnProperty(campo))
          {
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
    });
  } 

}
