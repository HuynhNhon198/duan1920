import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  route: string;
  role: string;
  constructor(
    private location: Location,
    private router: Router,
    private helper: HelperService,
    private ngzone: NgZone
  ) {
    router.events.subscribe((val) => {
      ngzone.run(() => {
        this.route = location.path();
        if (location.path().includes('/login')) {
          this.route = '/login';
        }
      });
    });
  }

  ngOnInit() {
    this.helper.role$.subscribe(user => {
      if (user.uid) {
        this.role = user.role;
      }
    });
  }
}
