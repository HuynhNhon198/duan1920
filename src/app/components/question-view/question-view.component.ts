import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.scss']
})
export class QuestionViewComponent implements AfterViewInit {
  @Input() question_dom: string;
  @Input() index: number;
  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.question_dom);
    this.question_dom = this.question_dom || '';
    document.getElementById('question').innerHTML = this.question_dom;
  }

}
