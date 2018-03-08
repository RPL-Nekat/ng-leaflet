import { Component, OnInit } from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

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
}