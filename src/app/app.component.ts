import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  route: string;
  constructor(
    private location: Location,
    private router: Router,
  ) {
    router.events.subscribe((val) => {
      this.route = location.path();
      if (location.path().includes('/login')) {
        this.route = '/login';
      }
    });
  }
}
