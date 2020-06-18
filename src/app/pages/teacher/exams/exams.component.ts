import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {
  exams = [
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '1A',
      students_statis: {

      },
      status: 0,
      type: 0,
      id: 'hjuiuig',

      time_start: 1592299074,
    },
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '2B',
      students_statis: {

      },
      status: 1,
      type: 0,

      id: 'hjuiuig',
      time_start: 1592299074,
    },
    {
      title: 'Kiểm Tra Hết học kì 1',
      of_class: '3A',
      students_statis: {

      },
      status: 0,
      type: 1,
      id: 'hjuiuig',
      time_start: 1592299074,
    }
  ];

  constructor(
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }
  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }
}
