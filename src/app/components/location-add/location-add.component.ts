import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

import * as L from 'leaflet';

@Component({
    selector: 'app-location-add',
    templateUrl: './location-add.component.html',
    styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

    name: string;
    desc: string;    
    latlng: L.latlng; 

    @Input()
    lat: string = this.mapService.latitude;
    lng: string = this.mapService.longitude;

    @Output() locationAdded = new EventEmitter<Location>();

    constructor(
        public snackBar: MatSnackBar,
        private mapService: MapService
    ) { }    

    ngOnInit() {        
    }

    addLocation() {
        this.locationAdded.emit({
            name: this.name,
            desc: this.desc,
            latlng: [this.mapService.latitude, this.mapService.longitude]
        });
        this.name = '';
        this.desc = '';
        this.latlng = '';
    }

    openSnackBar() {
    this.snackBar.open('Location info was saved', 'close', {
      duration: 2000,
    });    
  }

}
