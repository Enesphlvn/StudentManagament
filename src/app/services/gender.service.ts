import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../models/api-models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private apiUrl = 'https://localhost:7221/';

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Gender[]>{
    let newPath = this.apiUrl + 'genders';
    return this.httpClient.get<Gender[]>(newPath);
  }
}
