import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HelperService } from 'src/app/services/helper.service';
import { NzDrawerService } from 'ng-zorro-antd';
import { NextStepComponent } from './next-step/next-step.component';
import { IQuestions } from 'src/app/models/questions';
import { EsService } from '../../../../services/es.service';
import { FirestoreService } from '../../../../services/firestore.service';
@Component({
  selector: 'app-type0',
  templateUrl: './type0.component.html',
  styleUrls: ['./type0.component.scss']
})
export class Type0Component implements OnInit {

  @ViewChild('answerView') answerView: ElementRef;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  inputVisible = false;
  current_question = '';
  current_answer = '';
  current_tags = [];
  title = '';
  public = true;
  current_answers: {
    correct: boolean;
    answer: string
  }[] = [];
  _id = '';
  expand = false;
  list_questions: any[] = [];
  current_isTrue = false;
  info: IQuestions = {} as IQuestions;
  listOfItem = ['toán', 'văn'];
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
  isVisible = false;
  isLoading = false;
  findQ = '';
  options = [
  ];
  constructor(
    private helper: HelperService,
    private drawerService: NzDrawerService,
    private esSV: EsService,
    private fsSV: FirestoreService
  ) { }

  ngOnInit() {
  }

  test() {
    // document.getElementById('test').innerHTML = this.current_question || '';
    console.log(this.list_questions);
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

  selectQ() {
    console.log(this.findQ);
  }

  async findQe() {
    this.isLoading = true;
    const results = await this.esSV.getByQuery('questions', 'create_by.uid', this.helper.getRole().uid);
    this.options = results;
    this.isLoading = false;
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

  async addQuestion() {
    if (this.current_answers.filter(x => x.correct).length > 0) {
      if (this.current_question !== '') {
        this.list_questions.push({
          question: this.current_question,
          answers: this.current_answers
        });
        this.renderQuestion();
        await this.fsSV.setDoc(this.fsSV.questionsCol, '', {
          question: this.current_question,
          answers: this.current_answers,
          expand: false,
          tags: this.current_tags,
          id: (new Date()).getTime().toString(36),
        }, true);
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

  // nextStep(): void {
  //   const drawerRef = this.drawerService.create<NextStepComponent, { list_questions: any[] }, string>({
  //     nzTitle: 'Thông Tin Chung',
  //     nzContent: NextStepComponent,
  //     nzWidth: '25%',
  //     nzContentParams: {
  //       list_questions: this.list_questions
  //     }
  //   });

  //   drawerRef.afterOpen.subscribe(() => {
  //     console.log('Drawer(Component) open');
  //   });
  // }

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

  async addQuestionFormLib() {
    if (this.findQ.length > 0) {
      const q = this.options.find(x => x._id === this.findQ);
      this.list_questions.push({
        question: q.question,
        answers: q.answers
      });
      this.renderQuestion();
      this.isVisible = false;
    }
  }

  handleClose(removedTag: {}): void {
    this.current_tags = this.current_tags.filter(tag => tag !== removedTag);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.current_tags.indexOf(this.inputValue) === -1) {
      this.current_tags = [...this.current_tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  async saveTest() {
    if (this.title.length > 0 && this.current_tags.length > 0) {
      const test = {
        title: this.title,
        tags: this.current_tags,
        questions: this.list_questions,
        public: this.public,
        from_file: false
      };
      this._id = await this.fsSV.setDoc(this.fsSV.testSubjectCol, this._id, test, this._id === '' ? true : undefined);
    } else {
      this.helper.createMessage('Vui lòng thêm tiêu đề và ít nhất 1 tag', 'error');
    }
  }
}
