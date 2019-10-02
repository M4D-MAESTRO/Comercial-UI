import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from './config/api.config';
import { Observable } from 'rxjs';
import { OportunidadeDTO } from './models/oportunidade.dto';
import { NewOportunidadeDTO } from './models/newOportunidade.dto';

@Injectable({
  providedIn: 'root'
})
export class OportunidadeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${API_URL}oportunidades`);
  }

  saveOne(oportunidade: NewOportunidadeDTO): Observable<any> {
    return this.http.post(`${API_URL}oportunidades`, oportunidade);
  }
}
