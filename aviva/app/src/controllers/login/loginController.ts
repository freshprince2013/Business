import { Component, OnInit, NgZone } from '@angular/core';
import {FacebookService} from '../../services/facebook.service';

@Component({
  selector: 'login',
  moduleId: module.id,
  providers: [FacebookService],
  templateUrl: '../../views/login/login.html',
  styleUrls: ['../../../assets/styles/login/login.css', '../../../assets/styles/login/login-mobile.css']
})

export class loginController implements OnInit{
  name:string = "";
  isUser:boolean = false;

  constructor(
      private _ngZone: NgZone
      private _facebookService: FacebookService
  ){}

ngOnInit() {
  this._facebookService.loadAndInitFBSDK();
}

connect() {
  var self = this;
  FB.login(function(response) {
    if (response.authResponse) {
      FB.api('/me', function(response) {
        self._ngZone.run(() => {
          self.name = response.name;
          self.isUser = true
        });
        console.log(response);
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  },
  {scope:'public_profile,email'}
  );
}
}