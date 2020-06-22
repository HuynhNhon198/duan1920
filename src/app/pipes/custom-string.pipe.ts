import { Pipe, PipeTransform } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Pipe({
  name: 'customString'
})
export class CustomStringPipe implements PipeTransform {
  newStr = '' as any
  constructor(private helper: HelperService) { }

  transform(val: string | number, type: string): any {
    switch (type) {
      case 'IndexAnswer':
        const ref1 = [{
          id: 1,
          name: 'A.'
        }, {
          id: 2,
          name: 'B.'
        }, {
          id: 3,
          name: 'C.'
        }, {
          id: 4,
          name: 'D.'
        }];
        this.newStr = ref1.find(x => x.id === val).name;
        break;
      case 'StatusExam':
        const ref2 = this.helper.statusExam;
        this.newStr = ref2.find(x => x.id === val).name;
        break;
      case 'TypeExam':
        const ref3 = this.helper.typeExam;
        this.newStr = ref3.find(x => x.id === val).name;
        break;

      case 'role':
        const ref4 = [
          {
            code: 'teacher',
            name: 'Giáo Viên'
          },
          {
            code: 'student',
            name: 'Học Sinh'
          }
        ];
        this.newStr = ref4.find(x => x.code === val).name;
        break;
    }
    return this.newStr;

  }
}
