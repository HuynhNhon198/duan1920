import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { EsService } from '../../../services/es.service';
import { FirestoreService } from '../../../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  newExam = {
    status: 0,
    desc: ''
  } as any;
  exams = [
  ];
  temp = [];
  text = '';
  _id = '';
  visible = false;
  findQ = '';
  isLoading = false;
  options = [];
  class_id = '';
  class_name = '';
  check = false;
  studentInCLass = [];
  constructor(
    private helper: HelperService,
    private esSV: EsService,
    private fsSV: FirestoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe(params => {
      this.class_id = params.id;
    });
  }

  async ngOnInit() {
    const classData = await this.fsSV.getDoc(this.fsSV.classesCol, this.class_id);
    if (this.helper.getRole().uid === classData.create_by.uid) {
      this.check = true;
      this.studentInCLass = classData.students;
      this.class_name = classData.name;
      this.renderData();
    } else {
      this.router.navigate(['/404']);
    }
  }
  async renderData() {
    this.exams = this.helper.sortArrObj(await this.fsSV.getExamOfClass(this.class_id), 'ctime', 'desc');
    this.temp = this.exams;
  }
  close() {
    this.visible = false;
  }
  onChange(result: Date): void {
  }

  search() {
    this.exams = this.text === '' ? this.temp : this.temp.filter(x => x.title.toLowerCase().includes(this.text.toLowerCase()));
  }

  selectQ() {
  }

  async findQe() {
    this.isLoading = true;
    const publicTest = await this.esSV.getByQuery('test_subjects', 'public', true);
    const myTest = await this.esSV.getByQuery('test_subjects', 'create_by.uid', this.helper.getRole().uid);
    this.options = this.helper.getUniqueListBy([...publicTest, ...myTest], '_id');
    this.isLoading = false;
  }

  async addExam() {
    if (this.newExam.title && this.newExam.duration && this.newExam.time_start && this.findQ.length > 0) {
      this._id = await this.fsSV.setDoc(this.fsSV.examsCol, this._id, {
        title: this.newExam.title,
        duration: this.newExam.duration,
        time_start: this.helper.getMiliSec(this.newExam.time_start),
        of_class: this.class_id,
        status: 0,
        test_subject_id: this.findQ,
        desc: this.newExam.desc
      }, this._id === '' ? true : undefined);

      await this.helper.asyncForEach(this.studentInCLass, async uid => {
        await this.fsSV.create_noty(`${this.class_name} vừa có Bài Kiểm Tra mới`, uid);
      });

      this.renderData();
      this.visible = false;
    } else {
      this.helper.createMessage('Vui lòng nhập đủ các trường thông tin và chọn 1 đề cho bài kiểm tra trước khi lưu', 'error');
    }
  }
}
