import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-test-subject',
  templateUrl: './create-test-subject.component.html',
  styleUrls: ['./create-test-subject.component.scss']
})
export class CreateTestSubjectComponent implements OnInit {
  type: number; // loai de
  constructor() { }

  ngOnInit(): void {
  }

}
