import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  @ViewChild('inputAddClass') ipNewClass: ElementRef;
  classes = [
    {
      name: 'Lớp 5A',
      code: 'ZRCXT',
      teacher: 'Nguyễn Văn A',
      desc: '',
    },
    {
      name: 'Lớp 6A',
      code: 'ZRRXT',
      teacher: 'Nguyễn Văn B',
      desc: '',
    },
    {
      name: 'Lớp 7B',
      code: 'DSCXT',
      teacher: 'Nguyễn Thị C',
      desc: '',
    }
  ];
  codeToEnroll = '';
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
    this.router.navigate(['student/lop-hoc/' + id]);
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
