import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://localhost:7221/';

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable<Student[]>{
    let newPath = this.apiUrl + 'Students';
    return this.httpClient.get<Student[]>(newPath);
  }
}
