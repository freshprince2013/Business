import {Component, OnInit, NgZone, ViewChild, ElementRef, Input} from '@angular/core';
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


}