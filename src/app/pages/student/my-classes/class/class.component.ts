import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../../services/firestore.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  check = false;
  class_id: string;
  class: any = {};
  teacher: any = {};
  exams = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fsSV: FirestoreService,
    private helper: HelperService
  ) {
    route.params.subscribe(params => {
      this.class_id = params.id;
    });
  }

  async ngOnInit() {
    const classData = await this.fsSV.getDoc(this.fsSV.classesCol, this.class_id);
    if (classData) {
      this.class = classData;
      this.teacher = await this.fsSV.getDoc('users', this.class.create_by.uid);
      this.exams = this.helper.sortArrObj(await this.fsSV.getDocsWithCondi(this.fsSV.examsCol, 'of_class', '==', this.class_id), 'time_start', 'desc');

    } else {
      this.router.navigate(['/404']);
    }
  }

}
