import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* import { AuthService } from 'src/app/core/security/auth.service';
 */
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent {
  /* constructor(private oktaAuthService: AuthService, private route: ActivatedRoute) { }

  async ngOnInit() {
    console.log('CallbackComponent.ngOnInit()');
    await this.handleAuthentication();
  }

  async handleAuthentication() {
    console.log('CallbackComponent.handleAuthentication()');
    const queryParameters: any = this.route.snapshot.fragment;
    await this.oktaAuthService.handleAuthentication(queryParameters);
  } */
}
