import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  @ViewChild('inputAddClass') ipNewClass: ElementRef;
  classes = [
    {
      name: 'Lớp 5A',
      code: 'ZRCXT',
      students_length: 30,
      desc: '',
    },
    {
      name: 'Lớp 6A',
      code: 'ZRRXT',
      students_length: 50,
      desc: '',
    },
    {
      name: 'Lớp 7B',
      code: 'DSCXT',
      students_length: 40,
      desc: '',
    }
  ];
  isVisible = false;
  newClass = {
    name: '',
    desc: ''
  };
  constructor(
    private helper: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openClass(id: string) {
    this.router.navigate(['lop-hoc/' + id]);
  }

  openModalNewClass() {
    this.isVisible = true;
    setTimeout(() => {
      this.ipNewClass.nativeElement.focus();
    }, 500);
  }

  addClass() {
    if (this.newClass.name !== '') {

    } else {
      this.helper.createMessage('Vui lòng nhập tên lớp trước khi tạo', 'error', 2000);
    }
  }
}
