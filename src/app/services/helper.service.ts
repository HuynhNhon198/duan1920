import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  statusExam = [
    {
      id: 0,
      name: 'mới'
    },
    {
      id: 1,
      name: 'đang làm'
    },
    {
      id: 2,
      name: 'hoàn thành'
    },
    {
      id: 3,
      name: 'đã hủy'
    }
  ];

  typeExam = [
    {
      id: 0,
      name: 'Bài Tập Tự Luyện'
    },
    {
      id: 1,
      name: 'Kiểm Tra Trực Tuyến'
    }
  ];

  constructor(
    private message: NzMessageService
  ) { }

  loadingMessage(text: string) {
    const id = this.message.loading(text).messageId;
    return id;
  }

  createMessage(content: string, type: string, time?: number) {
    this.message.create(type, content, {
      nzDuration: time || 3000
    });
  }

  closeMessage(id: string) {
    this.message.remove(id);
  }
}
