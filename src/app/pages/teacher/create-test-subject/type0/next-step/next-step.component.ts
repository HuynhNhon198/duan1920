import { Component, OnInit, Input } from '@angular/core';
import { IQuestions } from 'src/app/models/questions';

@Component({
  selector: 'app-next-step',
  templateUrl: './next-step.component.html',
  styleUrls: ['./next-step.component.scss']
})
export class NextStepComponent implements OnInit {

  @Input() list_questions = [];
  @Input() info: IQuestions = {} as IQuestions;
  constructor() { }
  listOfItem = ['toán', 'văn'];
  ngOnInit(): void {
    console.log(this.list_questions);
  }
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (value.length > 0) {
      if (this.listOfItem.indexOf(value) === -1) {
        this.listOfItem = [...this.listOfItem, input.value];
      }
    }
  }
  onChange(result: Date): void {
    console.log('Selected Time: ', result.getTime());
  }
}
