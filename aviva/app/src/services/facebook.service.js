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
var FacebookService = (function () {
    function FacebookService() {
        if (!window.fbAsyncInit) {
            console.log('define');
            window.fbAsyncInit = function () {
                FB.init({
                    appId: '1800643373545065',
                    xfbml: true,
                    status: true,
                    cookie: true,
                    version: 'v2.8'
                });
            };
        }
    }
    FacebookService.prototype.loadAndInitFBSDK = function () {
        var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
        if (document.getElementById(id)) {
            return;
        }
        js = document.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        ref.parentNode.insertBefore(js, ref);
    };
    FacebookService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], FacebookService);
    return FacebookService;
}());
exports.FacebookService = FacebookService;
//# sourceMappingURL=facebook.service.js.map