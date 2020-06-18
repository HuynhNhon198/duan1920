import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-subjects',
  templateUrl: './test-subjects.component.html',
  styleUrls: ['./test-subjects.component.scss']
})
export class TestSubjectsComponent implements OnInit {

  list = [
    {
      title: 'Đề Kiểm Tra Chương I môn Toán Lớp 12',
      desc: '',
      categories: ['toán'],
      tags: ['chương 1', 'đại số'],
      public: true,
      questions_length: 50,
      id: 'dsadd'
    },
    {
      title: 'Đề Kiểm Tra Chương I môn Toán Lớp 12',
      desc: '',
      categories: ['toán'],
      tags: ['chương 1', 'đại số'],
      public: false,
      questions_length: 50,
      id: 'dsadd'
    },
    {
      title: 'Đề Kiểm Tra Chương I môn Toán Lớp 12',
      desc: '',
      categories: ['toán'],
      tags: ['chương 1', 'đại số'],
      public: true,
      questions_length: 50,
      id: 'dsadd'
    },
    {
      title: 'Đề Kiểm Tra Chương I môn Toán Lớp 12',
      desc: '',
      categories: ['toán'],
      tags: ['chương 1', 'đại số'],
      public: true,
      questions_length: 50,
      id: 'dsadd'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
