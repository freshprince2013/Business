import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoogleMapService {
    let baseUrl:string = "https://maps.googleapis.com/maps/api/geocode/json?latlng=-34.397,150.644&sensor=true";
    let out:any = {};

    /** TODO: still working on it **/
    /**
    constructor(http:Http) {
        console.log("Google map service has been called");
    }

    getMapResponse():Observable {
        this.http.get(this.baseUrl)
            .subscribe(result => {
                this.out =result.json();
                console.log(this.out);
            });
    }
     **/
}