import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';  // we need to import this now

@Injectable()
export class GoogleMapService {
    baseUrl:string = "https://maps.googleapis.com/maps/api/geocode/jsone";
    out:any = {};

    constructor(private _http:Http) {
        console.log("Google Map service has been initiated!");
    };

    getMapResponse(coordinates):Observable {
        var lat = coordinates.coords.latitude;
        var lng = coordinates.coords.longitude;
        console.log(lat + "," + lng);
        
        this._http.get(this.baseUrl + "?latlan=" + lat + "," + lng + "&sensor=true").subscribe(response => {
            this.out = response.json();
            console.log(this.out);
            return this.out;
        });
    }
}