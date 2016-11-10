import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';  // we need to import this now

@Injectable()
export class GoogleMapService implements OnInit {
    params:any;
    out:any;

    constructor(private _http:Http) {
        console.log("Google Map service has been initiated!");

    };

    ngOnInit() {
        this.params = { lat: null, lng: null };
        this.out = null;
    }

    getMapResponse(position):Observable {
        this._http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&sensor=true").subscribe(response => {
            this.out = response.json();
            console.log(this.out);
            return this.out;
        });
    }
}