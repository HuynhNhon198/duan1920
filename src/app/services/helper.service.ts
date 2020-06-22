import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { BehaviorSubject } from 'rxjs';
export interface IRole {
  name?: string;
  email?: string;
  role?: string;
  photoUrl?: string;
  uid: string;
}

@Injectable({
  providedIn: 'root'
})

export class HelperService {
  role$ = new BehaviorSubject<IRole>({
    uid: undefined
  });

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

  setRole(data: IRole) {
    data.photoUrl = data.photoUrl === null ? '' : data.photoUrl;
    this.role$.next(data);
  }

  getRole() {
    const role = this.role$.getValue();
    return role;
  }

  getMiliSec(date?: Date) {
    const d = date ? (new Date(date)).getTime() : (new Date()).getTime();
    // tslint:disable-next-line: no-bitwise
    return (d / 1000) >> 0;
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  sortArrObj(arr: any[], prop: string, type: string) {
    if (type.toLowerCase() === 'asc') {
      return arr.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0));
    } else {
      return arr.sort((a, b) => (a[prop] < b[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0));
    }
  }

  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}
