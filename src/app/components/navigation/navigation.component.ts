import { Component, OnInit, Input } from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	locations: Location[];

    @Input() markersOn: boolean;

    constructor(public mapService: MapService) { 
        this.markersOn = false;
    }

    ngOnInit() {
        this.mapService.disableMouseEvent('navigation');
        this.locations = this.mapService.getLocation();        
    }

    addLocation(location: Location) {
    	this.mapService.addLocation(location);
    }

    toggleMarkers(clicked: boolean) {
        this.markersOn = clicked;
        this.mapService.toggleMarkerAdd(this.markersOn);
    }
}
