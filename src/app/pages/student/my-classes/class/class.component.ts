import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  exams = [
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '1A',
      id: 'dsad',
      status: 0,
      type: 0,
      time_start: 1592299074,
    },
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '2B',
      id: 'dsad',
      status: 1,
      time_start: 1592299074,
      type: 0
    },
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '3A',
      id: 'dsad',
      status: 0,
      time_start: 1592299074,
      type: 1
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
