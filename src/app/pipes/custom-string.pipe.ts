import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customString'
})
export class CustomStringPipe implements PipeTransform {

  transform(val: string | number, type: string): any {
    let newStr = '' as any;
    switch (type) {
      case 'IndexAnswer':
        const ref = [{
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
        newStr = ref.find(x => x.id === val).name;
        break;
    }
    return newStr;

  }
}
