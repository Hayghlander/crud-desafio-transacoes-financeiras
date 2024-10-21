import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TipoTransacao} from '../models/TipoTransacao';
import {Transacao} from '../models/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  
  private baseUrl = 'http://localhost:8000/api';
  private apiUrl = `${this.baseUrl}/transacoes`;

  constructor(private http: HttpClient) { }

  getTransacoes(tipo?: string): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}?tipo=${tipo || ''}`);
  }

  createTransacao(transacaoData: any): Observable<any> {
    return this.http.post(this.apiUrl, transacaoData);
  }

  updateTransacao(id: number, transacao: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, transacao);
  }

  deleteTransacao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para obter todos os tipos de transação
  getTiposTransacao(): Observable<TipoTransacao[]> {
    return this.http.get<TipoTransacao[]>(`${this.baseUrl}/tipos-transacao`);
  }

}
