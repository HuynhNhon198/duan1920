import { Component, OnInit } from '@angular/core';
import { UploadChangeParam } from 'ng-zorro-antd';
import { HelperService } from 'src/app/services/helper.service';
import { IQuestions } from 'src/app/models/questions';

@Component({
  selector: 'app-type1',
  templateUrl: './type1.component.html',
  styleUrls: ['./type1.component.scss']
})
export class Type1Component implements OnInit {
  file: File;
  link_google_drive: string;
  // 'https://drive.google.com/file/d/1DL5pqvIJGbTlO5Ws0u0vv-2niVSheFGv/preview';
  linkInInput = '';
  questions = {

  } as IQuestions;
  QLength = 0;
  answers: string[] = [];

  listOfItem = ['toán', 'văn'];
  index = 0;

  constructor(
    private helper: HelperService
  ) { }

  ngOnInit(): void {
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result.getTime());
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
    console.log(this.file);
    const id_mess = this.helper.loadingMessage('Đang tải lên, vui lòng đợi...');
    setTimeout(() => {
      this.helper.closeMessage(id_mess);
    }, 3000);
  }

  changeQLength() {
    this.answers.length = this.QLength;
    console.log(this.answers);
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
}
