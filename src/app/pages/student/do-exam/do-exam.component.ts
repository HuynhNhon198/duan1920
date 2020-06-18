import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-do-exam',
  templateUrl: './do-exam.component.html',
  styleUrls: ['./do-exam.component.scss']
})
export class DoExamComponent implements OnInit {

  exam = {
    name: 'Bai Kiem Tra mon Van',
    time_start: 1592299074,
    test_subject_id: 'dsads',
    status: 2,
    class: '5A',
    time_to_do: 3600,
    desc: ''
  };

  test_subject = {
    name: '',
    questions: [
      {
        id: '1',
        question: '<p>1 + 1 = ?</p>',
        tags: ['toán'],
        answers: [
          {
            answer: '3',
          },
          {
            answer: '2',
          },
          {
            answer: '1',
          },
          {
            answer: '4',
          }
        ],
      },
      {
        id: '2',
        question: '<p>5x2=?</p>',
        tags: ['toán'],
        answers: [
          {
            answer: '3',
          },
          {
            answer: '7',
          },
          {
            answer: '10',
          },
          {
            answer: '4',
          }
        ],
      },
      {
        id: '2',
        question: '<p>5x2=?</p>',
        tags: ['toán'],
        answers: [
          {
            answer: '3',
          },
          {
            answer: '7',
          },
          {
            answer: '10',
          },
          {
            answer: '4',
          }
        ],
      }
    ]
  };

  timeView = '00:00';
  count = 0;
  bailam = [];
  constructor() {
    for (let i = 0; i < 50; i++) {
      this.bailam.push(i % 3 === 0 ? 'A' : '');
    }
  }

  ngOnInit(): void {
    this.countDown();
  }

  countDown() {
    this.count = this.exam.time_to_do;
    // this.time = this.questions.time;
    const timer = setInterval(() => {
      if (this.count >= 0) {
        this.timeView = this.convertToTimeView(this.count);
        this.count--;
      } else {
        clearInterval(timer);
      }
    }, 1000);
  }

  convertToTimeView(sec: number) {
    const quotient = Math.floor(sec / 60);
    const remainder = sec % 60;
    const newRemainder = remainder < 10 ? '0' + remainder : remainder;
    return `${quotient}:${newRemainder}`;
  }

  choose(i: number) {
    this.test_subject.questions[i]['chooses'] = this.test_subject.questions[i].answers.map((e, ind) => e['choose'] ? ind : undefined).filter(x => x !== undefined);

  }

  scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
