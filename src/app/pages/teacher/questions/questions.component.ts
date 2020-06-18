import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { HelperService } from '../../../services/helper.service';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @ViewChild('answerView') answerView: ElementRef;
  listQuestions = [
    {
      id: '1',
      question: '<p>1 + 1 = ?</p>',
      ctime: 1591541423,
      expand: false,
      tags: ['toán'],
      answers: [
        {
          answer: '3',
          correct: false
        },
        {
          answer: '2',
          correct: true
        },
        {
          answer: '1',
          correct: false
        },
        {
          answer: '4',
          correct: false
        }
      ],
    },
    {
      id: '2',
      question: '<p>5x2=?</p>',
      ctime: 1591541423,
      expand: false,
      tags: ['toán'],
      answers: [
        {
          answer: '3',
          correct: false
        },
        {
          answer: '7',
          correct: false
        },
        {
          answer: '10',
          correct: true
        },
        {
          answer: '4',
          correct: false
        }
      ],
    }
  ];
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
  isTrue = false;
  visible = false;
  current_answer = '';
  tagSuggests = [];
  new = true;
  question = {
    id: '',
    q: '',
    answers: [],
    tags: []
  } as any;


  constructor(private helper: HelperService) {
    this.listQuestions = this.listQuestions.map(x => Object.assign({ expand: false }, x));
    console.log(this.listQuestions);
  }

  ngOnInit(): void {
  }

  addAnswer() {
    if (this.current_answer.length > 0) {
      if (this.question.answers.length < 4) {
        this.question.answers.push({
          answer: this.current_answer,
          correct: this.isTrue
        });
        this.current_answer = '';
        this.isTrue = false;
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
  editQuestion(q) {
    console.log(q);
    this.question = {
      q: q.question,
      answers: q.answers,
      tags: q.tags,
      id: q.id
    };
    this.new = false;
    this.open();
  }
  removeQuestion(index: number) {
    console.log(index);
    this.listQuestions.splice(index, 1);
  }

  addQuestion(id?: string) {

    if (this.question.answers.filter(x => x.correct).length > 0) {
      if (this.question.q !== '') {
        if (this.question.tags.length > 0) {
          if (id.length > 0) {
            const ind = this.listQuestions.findIndex(x => x.id === id);
            const { q, answers, tags } = this.question;
            this.listQuestions[ind].question = q;
            this.listQuestions[ind].answers = answers;
            this.listQuestions[ind].tags = tags;
          } else {
            this.listQuestions.push({
              question: this.question.q,
              ctime: 1591541423,
              answers: this.question.answers,
              expand: false,
              tags: this.question.tags,
              id: (new Date()).getTime().toString(),
            });
            this.question.q = '';
            this.question.answers = [];
            this.question.id = '';
            this.question.tags = [];
          }
          this.helper.createMessage('Đã lưu câu hỏi', 'success', 1500);
          this.visible = false;
          this.question = {
            q: '',
            answers: [],
            tags: [],
            id: ''
          };
        } else {
          this.helper.createMessage('Vui lòng thêm tag để phân loại câu hỏi', 'error');
        }
      } else {
        this.helper.createMessage('Vui lòng nhập câu hỏi trước khi thêm', 'error');
      }
    } else {
      this.helper.createMessage('Vui lòng chọn 1 câu trả lời là đáp án đúng', 'error');
    }


  }

  deleteAnswer(i: number) {
    this.question.answers.splice(i, 1);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.question.answers, event.previousIndex, event.currentIndex);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.question = {
      q: '',
      answers: [],
      tags: [],
      id: ''
    };
  }

  handleClose(removedTag: {}): void {
    this.question.tags = this.question.tags.filter(tag => tag !== removedTag);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.question.tags.indexOf(this.inputValue) === -1) {
      this.question.tags = [...this.question.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

}
