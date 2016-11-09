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
var googlemap_service_1 = require('../../services/googlemap.service');
var homeController = (function () {
    function homeController(_googleMapService) {
        this._googleMapService = _googleMapService;
    }
    homeController.prototype.ngOnInit = function () {
        if (this._googleMapService) {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(this._googleMapService.getMapResponse);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], homeController.prototype, "user", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], homeController.prototype, "isUser", void 0);
    homeController = __decorate([
        core_1.Component({
            selector: 'home',
            moduleId: module.id,
            providers: [googlemap_service_1.GoogleMapService],
            templateUrl: '../../views/home/home.html',
            styleUrls: ['../../../assets/styles/home/home.css', '../../../assets/styles/home/home-mobile.css']
        }), 
        __metadata('design:paramtypes', [googlemap_service_1.GoogleMapService])
    ], homeController);
    return homeController;
}());
exports.homeController = homeController;
//# sourceMappingURL=homeController.js.map