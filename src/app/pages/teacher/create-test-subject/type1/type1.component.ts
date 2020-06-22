import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UploadChangeParam } from 'ng-zorro-antd';
import { HelperService } from 'src/app/services/helper.service';
import { FirestoreService } from '../../../../services/firestore.service';

@Component({
  selector: 'app-type1',
  templateUrl: './type1.component.html',
  styleUrls: ['./type1.component.scss']
})
export class Type1Component implements OnInit {
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  inputVisible = false;
  current_tags = [];
  file: File;
  link_google_drive: string;
  // link_google_drive = 'https://drive.google.com/file/d/1DL5pqvIJGbTlO5Ws0u0vv-2niVSheFGv/preview';
  linkInInput = '';
  questions = {
    title: '',
    desc: ''
  } as any;
  _id = '';
  QLength = 0;
  answers: string[] = [];
  public = true;
  listOfItem = ['toán', 'văn'];
  index = 0;

  constructor(
    private helper: HelperService,
    private fsSV: FirestoreService
  ) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
  }

  addItem(input: HTMLInputElement): void {
    const value = input.value;
    if (value.length > 0) {
      if (this.listOfItem.indexOf(value) === -1) {
        this.listOfItem = [...this.listOfItem, input.value];
      }

    }
  }

  handleChange({ file }: UploadChangeParam): void {
    this.file = file.originFileObj;
    const id_mess = this.helper.loadingMessage('Đang tải lên, vui lòng đợi...');
    setTimeout(() => {
      this.helper.closeMessage(id_mess);
    }, 3000);
  }

  changeQLength() {
    this.answers.length = this.QLength;
  }

  setAnswerCorrect(ind: number) {
    const correct = prompt(`ĐÁP ÁN ĐÚNG CHO CÂU ${ind < 9 ? '0' + (ind + 1) : ind + 1} LÀ: `);
    if (correct) {
      if (correct.match('^[a-zA-Z\(\)]+$') || !isNaN(+correct)) {
        this.answers[ind] = correct.toString();
        this.helper.createMessage(`Gõ phím enter hoặc space để nhập đáp án cho câu ${ind + 2}`, 'warning', 3000);
      }
    }
  }

  setLink() {
    if (this.linkInInput.length > 0) {
      this.link_google_drive = this.linkInInput.replace('view?usp=sharing', 'preview');
    } else {
      this.helper.createMessage('Vui lòng nhập link share từ google drive trước khi thêm', 'warning');
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
    if (this.questions.title.length > 0 && this.current_tags.length > 0) {
      if (this.answers.filter(x => x && x.length > 0).length === this.answers.length) {
        const test = {
          title: this.questions.title,
          desc: this.questions.desc,
          public: this.public,
          tags: this.current_tags,
          from_file: true,
          link_google_drive: this.link_google_drive,
          answer_correct_of_questions: [...this.answers.filter(x => x && x.length > 0)]
        };
        console.log(test);
        this._id = await this.fsSV.setDoc(this.fsSV.testSubjectCol, this._id, test, this._id === '' ? true : undefined);
      } else {
        this.helper.createMessage('Vui lòng thêm đáp án đúng cho các câu hỏi trước khi lưu', 'error');
      }
    } else {
      this.helper.createMessage('Vui lòng thêm tiêu đề, tag trước khi lưu', 'error');
    }
  }
}
