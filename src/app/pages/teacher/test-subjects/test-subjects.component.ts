import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-test-subjects',
  templateUrl: './test-subjects.component.html',
  styleUrls: ['./test-subjects.component.scss']
})
export class TestSubjectsComponent implements OnInit {

  list = [];
  temp = [];
  tags = [];
  tagSearch = '';
  radioValue = 'all';
  constructor(
    private fsSV: FirestoreService
  ) { }

  async ngOnInit() {
    const lists = await this.fsSV.getTests();
    this.renderData(lists);
  }

  search(e) {
    this.list = e === '' ? this.temp : this.temp.filter(x => (x.title as string).toLowerCase().includes(e.toLowerCase()));
  }

  renderData(tests) {
    let tags = [];
    this.list = tests.map(x => {
      tags = [...tags, ...x.tags];
      return new Object({
        _id: x._id,
        title: x.title,
        q_length: x.questions ? x.questions.length : x.answer_correct_of_questions.length,
        ctime: x.ctime,
        tags: x.tags,
        create_by: x.create_by
      });
    });
    this.tags = [...new Set(tags)];
    this.temp = this.list;
  }

  searchByTags(e) {
    if (e === null) {
      this.list = this.temp;
    } else {
      this.list = this.temp.filter(x => x.tags.includes(e));
    }
  }

  async filterBy(e) {
    let lists;
    switch (e) {
      case 'all':
        lists = await this.fsSV.getTests();
        break;
      case 'my':
        lists = await this.fsSV.myDocs(this.fsSV.testSubjectCol);
        break;
      default:
        break;
    }
    this.renderData(lists);
  }
}
