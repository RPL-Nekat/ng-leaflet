import { Component, OnInit, Input } from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
      selector: 'app-location-list',
      templateUrl: './location-list.component.html',
      styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {

    @Input()
    private location: Location;

    constructor(private mapService: MapService) { }

    ngOnInit() {
    }

    private removeLocation():void {
        this.mapService.removeLocation(this.location.id);
    }
}
