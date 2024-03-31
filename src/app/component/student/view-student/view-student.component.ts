import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../../models/ui-models/student.model';
import { GenderService } from '../../../services/gender.service';
import { Gender } from '../../../models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css',
})
export class ViewStudentComponent implements OnInit {
  genders: Gender[] = [];
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  constructor(
    private studentService: StudentService,
    private genderService: GenderService,
    private route: ActivatedRoute,
    private router : Router,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      this.studentService.getById(this.studentId).subscribe(
        (success) => {
          this.student = success;
        },
        (err) => {},
      );
    });

    this.getAllGenders();
  }

  getAllGenders() {
    this.genderService.getAll().subscribe(
      (success) => {
        this.genders = success;
      },
      (err) => {},
    );
  }

  onUpdate() {
    this.studentService.update(this.student.id, this.student).subscribe(
      (success) => {
        this.snackBar.open('Güncelleme işlemi başarılı', 'Kapat', {
          duration: 2000
        });
        this.router.navigateByUrl('students');
      },
      (error) => {
        this.snackBar.open('Güncelleme işlemi başarısız!', 'Kapat', {
          duration: 2000
        });
      },
    );
  }
}
