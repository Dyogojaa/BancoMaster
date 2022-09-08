import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Rota } from '../models/Rota';

const httpOptions ={
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization':`Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class RotasService {

  url: string ='https://localhost:5000/api/v1/Rotas';

  constructor(private http: HttpClient) { } 
  
  PegarRotas(): Observable<any[]> {
    const apiUrl = `${this.url}`;
    return this.http.get<any[]>(apiUrl);        
  }

  PegarRotaPeloId(rotaId:number): Observable<Rota>  {
    
    const apiUrl = `${this.url}/${rotaId}`;
    return this.http.get<Rota>(apiUrl);        
    
  };

  CadastraRota(rota :Rota): Observable<any>{    
    const apiUrl =`${this.url}`;    
    return this.http.post<Rota>(apiUrl, rota);
  }
  
  AtualizarRota(rotaId:number, rota: Rota):Observable<any>{
    const apiurl= `${this.url}/${rotaId}`;
    return this.http.put<Rota>(apiurl, rota, httpOptions);    
  }

  ExcluirRota(rotaId:number):Observable<any>{
    
    const apiurl= `${this.url}/${rotaId}`;
    return this.http.delete<number>(apiurl, httpOptions);

  }

  FiltrarRota(origem:string):Observable<Rota[]>{
    const apiurl= `${this.url}/FiltrarRotas/${origem}`;
    return this.http.get<Rota[]>(apiurl);

  }

  BuscarMenorValorRota(origem:string, destino: string):Observable<Rota[]>{
    const apiurl= `${this.url}/BuscaMenorValorRota/${origem}/${destino}`;
    return this.http.get<Rota[]>(apiurl);

  }


}
