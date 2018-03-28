import { Component, OnInit } from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

import * as fileSaver from 'file-saver';

@Component({
      selector: 'app-location-list',
      templateUrl: './location-list.component.html',
      styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

	locations: Location[];

    constructor(private mapService: MapService) { }

    ngOnInit() {
    	this.locations = this.mapService.getLocation();
    }

    getFile() {
    	let data = JSON.stringify(localStorage.getItem('locations'));
    	let blob = new Blob([data], { type: 'text/json' });
    	fileSaver.saveAs(blob, 'location-list.json');
    }
}