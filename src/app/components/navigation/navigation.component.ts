import { Component, OnInit } from '@angular/core';

import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    markersOn: boolean;

    constructor(private mapService: MapService) {
        this.markersOn = false;
    }

    ngOnInit() {
        this.mapService.disableMouseEvent('navigation');
    }

    toggleMarkers(on: boolean) {
        this.markersOn = on;
        this.mapService.toggleMarkerEditing(this.markersOn);
    }

}
