import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  students : Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private studentService : StudentService){}

  ngOnInit(): void {
    debugger;
    this.studentService.getAll().subscribe(
      (success) => {
        this.students = success;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {

      }
    );
  } 
}
