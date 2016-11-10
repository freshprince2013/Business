import { Component, OnInit, NgZone, ViewChild, ElementRef, Input } from '@angular/core';
import { GoogleMapService } from '../../services/googlemap.service';

@Component({
    selector: 'home',
    moduleId: module.id,
    providers: [GoogleMapService],
    templateUrl: '../../views/home/home.html',
    styleUrls: ['../../../assets/styles/home/home.css', '../../../assets/styles/home/home-mobile.css']
})

export class homeController implements OnInit {
    @Input() user:any;
    @Input() isUser:boolean;
    lat:number;
    lng: number;
    location:string;

    constructor(private _googleMapService: GoogleMapService) { }

    ngOnInit() {
        if (this._googleMapService && navigator.geolocation) {
            let self = this;
            navigator.geolocation.getCurrentPosition( function(pos) {
                self._googleMapService.getMapResponse(pos);
                self.lat = pos.coords.latitude;
                self.lng = pos.coords.longitude;
                //self.location = self._googleMapService.out.results[2].address_components[0].short_name;
            }, function() {
                console.log('Cannot locate on map!');
            }, {timeout:1000});
        }
    }
}