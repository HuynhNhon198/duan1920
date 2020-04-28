import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IQuestions } from 'src/app/models/questions';
import { NzDrawerService } from 'ng-zorro-antd';
import { DetailQuesionViewComponent } from './detail-quesion-view/detail-quesion-view.component';

@Component({
  selector: 'app-questions',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  example: IQuestions[] = [
    {
      title: 'Đề thi giữa kì môn toán',
      in_class: ['1A', '1B'],
      do_type: 'exercise',
      do_time: 90,
      questions: [],
      type: 'iframe'
    },
    {
      title: 'Đề thi giữa kì môn văn',
      in_class: ['3A'],
      do_type: 'exercise',
      do_time: 60,
      questions: [],
      type: 'basic'
    },
    {
      title: 'Đề thi giữa kì môn hóa',
      in_class: ['2A'],
      do_type: 'live',
      do_time: 90,
      questions: [],
      type: 'iframe'
    }
  ];

  class_selected = [];

  constructor(
    private drawerService: NzDrawerService
  ) { }

  ngOnInit(): void {
  }

  selectClass() {
    console.log(this.class_selected);
  }

  openDetailView(item: IQuestions) {
    const drawerRef = this.drawerService.create<DetailQuesionViewComponent, { value: string }, string>({
      nzTitle: item.title.toUpperCase(),
      nzContent: DetailQuesionViewComponent,
      nzContentParams: {
        value: item.title
      },
      nzWidth: '40%',
      nzClosable: false
    });
  }
}
