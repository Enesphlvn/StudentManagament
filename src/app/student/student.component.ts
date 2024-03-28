import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {

  constructor(private studentService : StudentService){}

  ngOnInit(): void {
    debugger;
    this.studentService.getAll().subscribe(
      (success) => 
      {
        var firstData = success[0].firstName;
      },
      (err) => 
      {

      }
    );
  } 
}
