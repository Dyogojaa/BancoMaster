import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RotasService } from 'src/app/services/rotas.service';

@Component({
  selector: 'app-nova-rota',
  templateUrl: './nova-rota.component.html',
  styleUrls: ['../listagem-rotas/listagem-rotas.component.css']
})
export class NovaRotaComponent implements OnInit {

  formulario: any;  
  erros:string[];   
  Id: number;  

  constructor(private rotasService: RotasService,
    private router : Router,
    private snackBar : MatSnackBar ) { }

  ngOnInit(): void {

    this.erros = [];   
    this.formulario = new FormGroup({      
      origem: new FormControl(null, [Validators.required,Validators.minLength(1), Validators.maxLength(10)]),
      destino: new FormControl(null,[Validators.required,Validators.minLength(1), Validators.maxLength(10)]),
      valor: new FormControl(null, [Validators.required])      
    });    
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
    this.rotasService.CadastraRota(rotas).subscribe((resultado) => {
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
