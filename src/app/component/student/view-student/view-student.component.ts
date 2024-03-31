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
  isNewStudent = false;
  header = '';

  constructor(
    private studentService: StudentService,
    private genderService: GenderService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      // studentId = "add" ise eklemeye göre
      if (this.studentId === 'add') {
        this.isNewStudent = true;
        this.header = 'Öğrenci Ekle';
      } else {
        this.isNewStudent = false;
        this.header = 'Öğrenci Bilgileri';
        this.studentService.getById(this.studentId).subscribe(
          (success) => {
            this.student = success;
          },
          (err) => {},
        );
      }
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
          duration: 2000,
        });
        this.router.navigateByUrl('students');
      },
      (error) => {
        this.snackBar.open('Güncelleme işlemi başarısız!', 'Kapat', {
          duration: 2000,
        });
      },
    );
  }

  onDelete() {
    this.studentService.delete(this.student.id).subscribe(
      (success) => {
        this.snackBar.open('Silme işlemi başarılı', 'Kapat', {
          duration: 2000,
        });
        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, 2000);
      },
      (error) => {
        this.snackBar.open('Silme işlemi başarısız', 'Kapat', {
          duration: 2000,
        });
      },
    );
  }

  onAdd() {
    this.studentService.add(this.student).subscribe(
      (success) => {
        this.snackBar.open('Ekleme işlemi başarılı', 'Kapat', {
          duration: 2000,
        });
        setTimeout(() => {
          this.router.navigateByUrl(`students/${success.id}`);
        }, 2000);
      },
      (error) => {
        this.snackBar.open('Ekleme işlemi başarısız!', 'Kapat', {
          duration: 2000,
        });
      },
    );
  }
}
