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
    	let data = localStorage.getItem('locations');
      let file = new File([data], 'location-list.json', { type: 'text/json;charset=utf-8' });
      fileSaver.saveAs(file);
    }
}