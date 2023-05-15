import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qrnotify-front';

  constructor(private router: Router) { }
  shouldShowFooter() {
    return !this.router.url.includes('/login') && !this.router.url.includes('/qrcode');
  }


}
