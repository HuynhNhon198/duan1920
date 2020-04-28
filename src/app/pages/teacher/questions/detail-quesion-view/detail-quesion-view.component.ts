import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-quesion-view',
  templateUrl: './detail-quesion-view.component.html',
  styleUrls: ['./detail-quesion-view.component.scss']
})
export class DetailQuesionViewComponent implements OnInit {
  @Input() value = '';

  constructor() { }

  ngOnInit(): void {
  }

}
