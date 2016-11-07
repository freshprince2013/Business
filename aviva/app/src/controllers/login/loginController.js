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
var loginController = (function () {
    function loginController(_ngZone, _facebookService) {
        this._ngZone = _ngZone;
        this._facebookService = _facebookService;
        this.name = "";
        this.isUser = false;
    }
    loginController.prototype.ngOnInit = function () {
        this._facebookService.loadAndInitFBSDK();
    };
    loginController.prototype.connect = function () {
        var self = this;
        FB.login(function (response) {
            if (response.authResponse) {
                FB.api('/me', function (response) {
                    self._ngZone.run(function () {
                        self.name = response.name;
                        self.isUser = true;
                    });
                    console.log(response);
                });
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, { scope: 'public_profile,email' });
    };
    loginController = __decorate([
        core_1.Component({
            selector: 'login',
            moduleId: module.id,
            providers: [facebook_service_1.FacebookService],
            templateUrl: '../../views/login/login.html',
            styleUrls: ['../../../assets/styles/login/login.css', '../../../assets/styles/login/login-mobile.css']
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, facebook_service_1.FacebookService])
    ], loginController);
    return loginController;
}());
exports.loginController = loginController;
//# sourceMappingURL=loginController.js.map