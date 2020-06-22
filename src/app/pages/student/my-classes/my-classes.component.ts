import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.scss']
})
export class MyClassesComponent implements OnInit {

  @ViewChild('inputAddClass') ipNewClass: ElementRef;
  classes = [];
  temp = [];
  text = '';
  codeToEnroll = '';
  isVisible = false;
  constructor(
    private helper: HelperService,
    private router: Router,
    private fsSV: FirestoreService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const data = await this.fsSV.getDoc('users', this.helper.getRole().uid);
    this.classes = data?.in_class || [];
    this.temp = this.classes;
  }

  search() {

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

  async addClass() {
    if (this.codeToEnroll !== '') {
      const r = await this.fsSV.erroll(this.codeToEnroll);
      if (r) {
        this.isVisible = false;
        this.getData();
      }
    } else {
      this.helper.createMessage('Vui lòng nhập mã lớp trước khi tham gia', 'error', 2000);
    }
  }

}
