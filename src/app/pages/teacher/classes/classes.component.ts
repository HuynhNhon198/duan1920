import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  @ViewChild('inputAddClass') ipNewClass: ElementRef;
  classes = [
  ];
  temp = [];
  isVisible = false;
  newClass = {
    name: '',
    desc: ''
  };
  text = '';
  constructor(
    private helper: HelperService,
    private router: Router,
    private fsSV: FirestoreService
  ) { }

  ngOnInit(): void {
    this.renderData();
  }

  openClass(id: string) {
    this.router.navigate(['lop-hoc/' + id]);
  }

  async renderData() {
    this.classes = await this.fsSV.myDocs(this.fsSV.classesCol);
    this.temp = this.classes;
  }
  openModalNewClass() {
    this.isVisible = true;
    setTimeout(() => {
      this.ipNewClass.nativeElement.focus();
    }, 500);
  }

  async addClass() {
    if (this.newClass.name !== '') {
      const r = await this.fsSV.setDoc(this.fsSV.classesCol, '', {
        name: this.newClass.name,
        desc: this.newClass.desc,
        code: (new Date()).getTime().toString(36).toUpperCase(),
        students: []
      }, true);
      if (r) {
        this.isVisible = false;
        this.renderData();
      }
    } else {
      this.helper.createMessage('Vui lòng nhập tên lớp trước khi tạo', 'error', 2000);
    }
  }

  search() {
    this.classes = this.text === '' ? this.temp : this.temp.filter(x => x.name.toLowerCase().includes(this.text.toLowerCase()) || x.code.toLowerCase().includes(this.text.toLowerCase()));
  }

  copyCode(code, e) {
    e.preventDefault();
    alert(code);
  }
}
