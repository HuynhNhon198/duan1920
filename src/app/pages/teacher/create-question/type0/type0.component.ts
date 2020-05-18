import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-type0',
  templateUrl: './type0.component.html',
  styleUrls: ['./type0.component.scss']
})
export class Type0Component implements OnInit {

  @ViewChild('answerView') answerView: ElementRef;

  current_question = '';
  current_answer = '';
  current_answers: {
    correct: boolean;
    answer: string
  }[] = [];
  expand = false;
  list_questions: any[] = [];
  current_isTrue = false;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'link', 'image'],             // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }, 'formula'],      // superscript/subscript
      [{ align: [] }],          // outdent/indent

      [{ header: [1, 2, 3, 4, 5, 6, false] }],       // custom dropdown

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
    ]
  };

  constructor(
    private helper: HelperService
  ) { }

  ngOnInit() {
  }

  test() {
    document.getElementById('test').innerHTML = this.current_question || '';
  }

  expandF() {
    this.list_questions.forEach((e, i) => {
      e.expand = this.expand;
    });
    this.expand = !this.expand;
  }
  addAnswer() {
    if (this.current_answer.length > 0) {
      if (this.current_answers.length < 4) {
        this.current_answers.push({
          answer: this.current_answer,
          correct: this.current_isTrue
        });
        this.current_answer = '';
        this.current_isTrue = false;
        setTimeout(() => {
          this.answerView.nativeElement.focus();
        }, 10);
      } else {
        this.helper.createMessage('Số Câu Trả Lời Cho Mỗi Câu Hỏi Không Lớn Hơn 4', 'error');
      }

    } else {
      this.helper.createMessage('Vui lòng nhập câu trả lời trước khi thêm.', 'error', 2000);
    }
  }

  renderQuestion() {
    setTimeout(() => {
      this.list_questions.forEach((e, i) => {
        e.expand = e.expand || true;
        document.getElementById('question-' + i).innerHTML = e.question;
      });
    }, 10);
  }

  removeQuestion(index: number) {
    this.list_questions.splice(index, 1);
    this.renderQuestion();
  }

  addQuestion() {
    if (this.current_answers.filter(x => x.correct).length > 0) {
      if (this.current_question !== '') {
        this.list_questions.push({
          question: this.current_question,
          answers: this.current_answers
        });
        this.renderQuestion();
        this.current_question = '';
        this.current_answers = [];
      } else {
        this.helper.createMessage('Vui lòng nhập câu hỏi trước khi thêm', 'error');
      }
    } else {
      this.helper.createMessage('Vui lòng chọn 1 câu trả lời là đáp án đúng', 'error');
    }
  }

  deleteAnswer(i: number) {
    this.current_answers.splice(i, 1);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.current_answers, event.previousIndex, event.currentIndex);
  }
}
