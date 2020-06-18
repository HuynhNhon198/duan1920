import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  exam = {
    title: 'Kiểm Tra Hết học kì 1',
    of_class: '1A',
    students_statis: [
      {
        name: 'Nguyen Van A',
        id: 'dsjsd',
        email: 'a@gmail.com',
        correct: 30,
        incorrect: 10
      },
      {
        name: 'Dao Van E',
        id: 'dsjsd',
        email: 'a@gmail.com',
        correct: 45,
        incorrect: 5
      },
      {
        name: 'Nguyen Thi A',
        id: 'dsjsd',
        email: 'a@gmail.com',
        correct: 34,
        incorrect: 10
      }, {
        name: 'Nguyen Van C',
        id: 'dsjsd',
        email: 'a@gmail.com',
        correct: 25,
        incorrect: 20
      }, {
        name: 'Nguyen Van B',
        id: 'dsjsd',
        email: 'a@gmail.com',
        correct: 38,
        incorrect: 10
      }
    ],
    test_subject: {
      title: 'Đề Kiểm Tra Chương I môn Toán Lớp 12',
      id: 'dssdsa',
      questions_length: 50
    },
    status: 0,
    type: 0,
    id: 'hjuiuig',
    desc: '',
    time_start: 1592299074,
    duration: 60
  } as any;
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  onBack(): void {
    this.location.back();
  }
}
