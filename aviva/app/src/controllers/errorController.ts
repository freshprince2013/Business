import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FacebookService } from '../services/facebook.service';

@Component({
    selector: 'error',
    moduleId: module.id,
    providers: [FacebookService],
    templateUrl: '../views/error.html',
    styleUrls: ['../../assets/styles/error/error.css', '../../assets/styles/error/error-mobile.css']
})

export class errorController implements OnInit {

}