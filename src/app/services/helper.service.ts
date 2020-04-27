import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

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
