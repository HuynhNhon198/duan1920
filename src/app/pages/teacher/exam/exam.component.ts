import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper.service';
import { FirestoreService } from '../../../services/firestore.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  text = '';
  exam = {
  } as any;
  test_subject: any = {
    questions: []
  };
  results = [];
  temp = []
  exam_id: string;
  sub: Subscription;
  constructor(private location: Location, private helper: HelperService, private fsSV: FirestoreService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      this.exam_id = params.id;
    });
  }

  async ngOnInit() {
    this.exam = await this.fsSV.getDoc(this.fsSV.examsCol, this.exam_id);
    if (this.exam && this.exam.create_by.uid === this.helper.getRole().uid) {
      this.test_subject = await this.fsSV.getDoc(this.fsSV.testSubjectCol, this.exam.test_subject_id);
      this.sub = this.fsSV.subStudentsInExam(this.exam_id).subscribe(students => {
        this.results = students;
        this.temp = this.results;
      });
    } else {
      this.router.navigate(['/404']);
    }
  }
  search() {
    this.results = this.text === '' ? this.temp : this.temp.filter(x => x.info.name.toLowerCase().includes(this.text.toLowerCase()) || x.info.email.toLowerCase().includes(this.text.toLowerCase()));
  }
  onBack(): void {
    this.location.back();
  }
}
