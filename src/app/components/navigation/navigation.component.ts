import { Component, OnInit, Input } from '@angular/core';

import {MatSnackBar} from '@angular/material';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

	locations: Location[];

    @Input() search: string;
    markersOn: boolean;

    constructor(
        public snackBar: MatSnackBar,
        public mapService: MapService
        ) { 
        this.search = '';
        this.markersOn = false;
    }

    ngOnInit() {
        this.mapService.disableMouseEvent('navigation');
        this.locations = this.mapService.getLocation();        
    }

    // cari(address: string) {
    //     if (!address) {
    //         return;
    //     }

    //     this.mapService.
    // }

    addLocation(location: Location) {
    	this.mapService.addLocation(location);
    }

    toggleMarkers(clicked: boolean) {
        this.markersOn = clicked;
        this.mapService.toggleMarkerAdd(this.markersOn);
    }


}
