import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoQuestionService {

  constructor() { }

  equals = [
    {
      equal: 'x + y',
      id: 'cong',
    },
    {
      equal: 'x - y',
      id: 'tru',
    },
    {
      equal: 'x * y',
      id: 'nhan',
    },
    {
      equal: 'x / y',
      id: 'chia',
    }
  ];
  objects = {
    obj1: ['Lan', 'Hoa', 'Hồng'],
    obj2: ['Hùng', 'Hải', 'Hiếu'],
    obj3: ['cái kẹo', 'cái bánh', 'quả táo']
  };

  getIndexRandom(max, mi?) {
    const min = mi || 0;
    return Math.floor(Math.random() * (max - min) + min);
  }

  setAnswers(correct) {
    const else_answers = [this.getIndexRandom(9), this.getIndexRandom(9), this.getIndexRandom(9)];
    const answers = [];
    const correct_position = this.getIndexRandom(4);
    for (let i = 0; i < 4; i++) {
      if (i === correct_position) {
        answers[i] = {
          answer: correct,
          correct: true
        };
      } else {
        answers[i] = {
          answer: else_answers[0] + i
        };
        else_answers.shift();
      }
    }
    return answers;
  }

  generate(equal_id) {

    const obj1 = this.objects.obj1[this.getIndexRandom(this.objects.obj1.length)];
    const obj2 = this.objects.obj2[this.getIndexRandom(this.objects.obj2.length)];
    const obj3 = this.objects.obj3[this.getIndexRandom(this.objects.obj3.length)];
    const x = this.getIndexRandom(11, 1);
    let y = this.getIndexRandom(11, 1);
    let result;
    let question = '';
    switch (equal_id) {
      case 'cong':
        question = `${obj1} có ${x} ${obj3}, ${obj2} cho ${obj1} ${y} ${obj3}. Hỏi ${obj1} có bao nhiêu ${obj3} ?`;
        result = {
          question,
          answers: this.setAnswers(x + y)
        };
        break;
      case 'tru':
        y = (y < x) ? y : this.getIndexRandom(x);
        question = `${obj1} có ${x} ${obj3}, ${obj1} cho ${obj2} ${y} ${obj3}. Hỏi ${obj1} có bao nhiêu ${obj3} ?`;
        result = {
          question,
          answers: this.setAnswers(x - y)
        };
        break;
      case 'chia':

        break;
    }
    return (result);
  }

}
