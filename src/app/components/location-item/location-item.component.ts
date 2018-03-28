import { Component, OnInit, Input} from '@angular/core';

import * as L from 'leaflet';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';
import { MapComponent } from '../map/map.component';

@Component({
    selector: 'app-location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

    @Input('location') location: Location;

    constructor(
        public mapService: MapService,
        private mapComponent: MapComponent
    ) { }

    ngOnInit() {
    }

    private markClick(location: L.LatLng) {
        this.mapService.map.panTo(location);
    }
    
    private removeLocation(location: Location) {
        const response = confirm('Remove this place?');
        if (response) {
            this.mapService.removeLocation(location);                                    
            // console.log(this.mapComponent.markers);
            this.mapComponent.markers.forEach(marker => {
                if (marker.name == location.name) {
                    this.mapComponent.map.removeLayer(marker);
                }
            });
        }        
    }
}
