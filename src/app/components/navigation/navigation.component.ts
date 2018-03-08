import { Component, OnInit } from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	locations: Location[]

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.mapService.disableMouseEvent('navigation');
        this.locations = this.mapService.getLocation();
    }

    addLocation(location: Location) {
    	this.mapService.addLocation(location);
    }
}
