import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';
import { FirestoreService } from '../../../../services/firestore.service';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

const db = firebase.firestore();
@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss']
})
export class ListStudentsComponent implements OnInit {

  class_id: string;
  students = [

  ];
  constructor(
    private helper: HelperService,
    private fsSV: FirestoreService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      this.class_id = params.id;
    })
  }

  async ngOnInit() {
    const docs = await db.collection(this.fsSV.classesCol).doc(this.class_id).collection('students').get();
    docs.forEach(doc => {
      this.students.push(doc.data());
    })
  }

}
