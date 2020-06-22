import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  me: any = {
    name: '',
    phone: '',
    hometown: '',
    school: ''
  };
  constructor(private fsSV: FirestoreService, private helper: HelperService) { }

  async ngOnInit() {
    this.me = Object.assign(this.me, await this.fsSV.getDoc('users', this.helper.getRole().uid));
    console.log(this.me);
  }
  async save() {
    const { name, phone, hometown, school } = this.me;
    await this.fsSV.setDoc('users', this.me._id, { name, phone, hometown, school });
  }
}
