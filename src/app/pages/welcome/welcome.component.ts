import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  text = '';
  tests = [];
  temp = [];
  tags = [];
  tagSearch = '';
  sub: Subscription;
  constructor(
    public helper: HelperService,
    private router: Router,
    private fsSV: FirestoreService
  ) { }

  async ngOnInit() {
    let tags = [];
    const data = await this.fsSV.getDocsWithCondi(this.fsSV.testSubjectCol, 'public', '==', true);
    data.forEach(x => {
      tags = [...tags, ...x.tags];
      x.q_length = x.questions ? x.questions.length : x.answer_correct_of_questions.length;
    });
    this.tests = this.helper.sortArrObj(data, 'ctime', 'desc');
    this.tags = [...new Set(tags)];
    this.temp = this.tests;
    this.sub = this.helper.role$.subscribe(user => {
      if (user.uid) {
        if (user.role === 'teacher') {
          this.router.navigate(['/danh-sach-lop-hoc']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search() {
    this.tests = this.text === '' ? this.temp : this.temp.filter(x => (x.title as string).toLowerCase().includes(this.text.toLowerCase()));
  }

  searchByTags(e) {
    if (e === null) {
      this.tests = this.temp;
    } else {
      this.tests = this.temp.filter(x => x.tags.includes(e));
    }
  }
}
