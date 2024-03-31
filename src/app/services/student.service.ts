import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/updateStudentRequest.model';
import { AddStudentRequest } from '../models/api-models/addStudentRequest.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:7221/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Student[]> {
    let newPath = this.apiUrl + 'students';
    return this.httpClient.get<Student[]>(newPath);
  }

  getById(studentId: string | null): Observable<Student> {
    let newPath = this.apiUrl + 'students/' + studentId;
    return this.httpClient.get<Student>(newPath);
  }

  update(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    let newPath = this.apiUrl + 'students/' + studentId;
    return this.httpClient.put<Student>(newPath, updateStudentRequest);
  }

  delete(studentId: string): Observable<Student> {
    let newPath = this.apiUrl + 'students/' + studentId;
    return this.httpClient.delete<Student>(newPath);
  }

  add(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    let newPath = this.apiUrl + 'students/add';
    return this.httpClient.post<Student>(newPath, addStudentRequest);
  }
}
