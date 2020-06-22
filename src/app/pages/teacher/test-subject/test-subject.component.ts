import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../../services/firestore.service';
@Component({
  selector: 'app-test-subject',
  templateUrl: './test-subject.component.html',
  styleUrls: ['./test-subject.component.scss']
})
export class TestSubjectComponent implements OnInit {
  test_subject: any = {};
  test_subject_id: string;
  constructor(private location: Location, private route: ActivatedRoute, private fsSV: FirestoreService, private router: Router) {
    route.params.subscribe(p => this.test_subject_id = p.id);
  }

  async ngOnInit() {
    this.test_subject = await this.fsSV.getDoc(this.fsSV.testSubjectCol, this.test_subject_id);
    if (!this.test_subject) {
      this.router.navigate(['/404']);
    }
  }
  onBack(): void {
    this.location.back();
  }
  scroll(id: string) {
    const el = document.getElementById(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
