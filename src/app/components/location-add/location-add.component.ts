import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

import { MapComponent } from '../map/map.component';


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
    viewBounds: L.LatLngBounds;

    @Output() locationAdded = new EventEmitter<Location>();

    constructor(
        public snackBar: MatSnackBar,
        private mapService: MapService,
        private mapComponent: MapComponent
    ) { }    

    ngOnInit() {        
    }

    addLocation() {
        this.locationAdded.emit({
            name: this.name,
            desc: this.desc,
            latlng: [this.mapService.latitude, this.mapService.longitude],
            viewBounds: this.mapService.viewBounds
        });
        this.name = '';
        this.desc = '';
        this.latlng = '';
        this.viewBounds = '';

        this.mapComponent.loadmarker();
        let marker = this.mapService.markers;
        marker.remove();
    }

    openSnackBar() {
    this.snackBar.open('Location info was saved', 'close', {
      duration: 2000,
    });    
  }

}
