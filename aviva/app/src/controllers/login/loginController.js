"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var facebook_service_1 = require('../../services/facebook.service');
var router_1 = require('@angular/router');
var homeController_1 = require('../../controllers/home/homeController');
var loginController = (function () {
    function loginController(_ngZone, _facebookService, route, router) {
        this._ngZone = _ngZone;
        this._facebookService = _facebookService;
        this.route = route;
        this.router = router;
    }
    loginController.prototype.ngOnInit = function () {
        this._facebookService.loadAndInitFBSDK();
        this.setDefaults();
    };
    loginController.prototype.setDefaults = function () {
        this.id = 0;
        this.user = null;
        this.isUser = false;
        this.rememberFlag = false;
    };
    loginController.prototype.connect = function () {
        var self = this;
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {
                /** The user has already logged into Facebook **/
                self.getFacebookUserData(self, response);
            }
            else {
                /** The user hasn't logged into Facebook yet **/
                FB.login(function (response) {
                    console.log(response);
                    if (response.authResponse) {
                        self.getFacebookUserData(self, response);
                    }
                    else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                });
            }
        });
    };
    loginController.prototype.getFacebookUserData = function (evt, res) {
        FB.api('/me', 'get', {
            access_token: res.authResponse.accessToken,
            fields: 'id,name,email,gender,picture,about,birthday,first_name,last_name,locale'
        }, function (res) {
            evt._ngZone.run(function () {
                evt.id = res.id;
                evt.user = res;
                evt.isUser = true;
            });
            console.log(res);
        });
    };
    loginController.prototype.toggleRemember = function () {
        this.rememberFlag = (this.rememberFlag === false) ? true : false;
    };
    loginController.prototype.navigateToHomePage = function () {
        this.router.navigate(['/home', { id: this.id, user: this.id }]);
    };
    loginController = __decorate([
        core_1.Component({
            selector: 'login',
            moduleId: module.id,
            providers: [facebook_service_1.FacebookService],
            directives: [homeController_1.homeController],
            templateUrl: '../../views/login/login.html',
            styleUrls: ['../../../assets/styles/login/login.css', '../../../assets/styles/login/login-mobile.css']
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, facebook_service_1.FacebookService, router_1.ActivatedRoute, router_1.Router])
    ], loginController);
    return loginController;
}());
exports.loginController = loginController;
//# sourceMappingURL=loginController.js.map