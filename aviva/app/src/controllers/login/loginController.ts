import { Component, OnInit, NgZone } from '@angular/core';
import { FacebookService } from '../../services/facebook.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { homeController } from '../../controllers/home/homeController';

@Component({
  selector: 'login',
  moduleId: module.id,
  providers: [FacebookService],
  directives : [homeController],
  templateUrl: '../../views/login/login.html',
  styleUrls: ['../../../assets/styles/login/login.css', '../../../assets/styles/login/login-mobile.css']
})

export class loginController implements OnInit{
  id:number;
  user:any;
  isUser:boolean;
  rememberFlag:boolean;

  constructor(
      private _ngZone: NgZone,
      private _facebookService: FacebookService,
      private route: ActivatedRoute,
      private router: Router
  ){}

ngOnInit() {
  this._facebookService.loadAndInitFBSDK();
  this.setDefaults();
}

setDefaults() {
  this.id = 0;
  this.user = null;
  this.isUser = false;
  this.rememberFlag = false;
}

connect() {
  var self = this;

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      /** The user has already logged into Facebook **/
      self.getFacebookUserData(self, response);
    } else {
      /** The user hasn't logged into Facebook yet **/
      FB.login(function (response) {
        console.log(response);
        if (response.authResponse) {
          self.getFacebookUserData(self, response);
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });
      }
  });
}

getFacebookUserData(evt, res) {
  FB.api('/me', 'get', {
    access_token: res.authResponse.accessToken,
    fields: 'id,name,email,gender,picture,about,birthday,first_name,last_name,locale'
  }, function (res) {
    evt._ngZone.run(() => {
      evt.id = res.id;
      evt.user = res;
      evt.isUser = true;
    });
    console.log(res);
  });
}

toggleRemember() {
  this.rememberFlag = (this.rememberFlag === false) ? true : false;
}

navigateToHomePage() {
  this.router.navigate(['/home', { id: this.id, user: this.id }]);
}
}