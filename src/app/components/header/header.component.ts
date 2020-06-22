import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Subscription } from 'rxjs';
import { HelperService, IRole } from 'src/app/services/helper.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sub: Subscription;
  user: IRole = {
    uid: undefined,
    name: ''
  };
  notis = [];
  constructor(private ngZone: NgZone, public FBSV: FirebaseService, public helper: HelperService, private fsSV: FirestoreService) { }

  ngOnInit(): void {
    this.sub = this.helper.role$.subscribe(user => {
      this.ngZone.run(() => {
        this.user = user;
        if (user.uid) {
          this.fsSV.subNoty().subscribe(notis => {
            this.notis = notis;
          });
        }
        // your original code

      });
    });


  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
