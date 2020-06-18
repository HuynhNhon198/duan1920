import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {

  students = [
    {
      name: 'nguyen van a',
      email: 'abc@gmail.com',
      code: 'sadntrx',
      ctime: 1591541423,
      birth: '01/01/1998',
      hometown: 'Thai Thuy, Thai Binh',
    },
    {
      name: 'nguyen van b',
      email: 'abc@gmail.com',
      code: 'sdsdsx',
      ctime: 1591541423,
      birth: '01/01/1998',
      hometown: 'Thai Thuy, Thai Binh',
    },
    {
      name: 'nguyen van c',
      email: 'abc@gmail.com',
      code: 'assadnx',
      ctime: 1591541423,
      birth: '01/01/1998',
      hometown: 'Thai Thuy, Thai Binh',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
