import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  newExam = {
    status: 0
  } as any;
  exams = [
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '1A',
      students_statis: {

      },
      status: 0,
      time_start: 1592299074,
      type: 0,
      id: 'dsadsa'
    },
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '2B',
      students_statis: {

      },
      status: 1,
      time_start: 1592299074,
      id: 'dsadsa',
      type: 0
    },
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '3A',
      students_statis: {

      },
      status: 0,
      time_start: 1592299074,
      type: 1,

      id: 'dsadsa'
    }
  ];
  visible = false;
  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.visible = false;
  }
  onChange(result: Date): void {
    console.log('Selected Time: ', result.getTime());
  }
}
