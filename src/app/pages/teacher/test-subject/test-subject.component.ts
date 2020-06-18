import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-test-subject',
  templateUrl: './test-subject.component.html',
  styleUrls: ['./test-subject.component.scss']
})
export class TestSubjectComponent implements OnInit {
  test_subject = {
    name: 'Đề Kiểm Tra Chương I môn Toán Lớp 12',
    tags: ['chương 1', 'đại số'],
    categories: ['toán'],
    questions: [
      {
        id: '1',
        question: '<p>1 + 1 = ?</p>',
        tags: ['toán'],
        answers: [
          {
            answer: '3',
          },
          {
            answer: '2',
          },
          {
            answer: '1',
          },
          {
            answer: '4',
          }
        ],
      },
      {
        id: '2',
        question: '<p>5x2=?</p>',
        tags: ['toán'],
        answers: [
          {
            answer: '3',
          },
          {
            answer: '7',
          },
          {
            answer: '10',
          },
          {
            answer: '4',
          }
        ],
      },
      {
        id: '2',
        question: '<p>5x2=?</p>',
        tags: ['toán'],
        answers: [
          {
            answer: '3',
          },
          {
            answer: '7',
          },
          {
            answer: '10',
          },
          {
            answer: '4',
          }
        ],
      }
    ]
  };
  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  onBack(): void {
    this.location.back();
  }
  scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
