import { Component, OnInit, Input} from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

    @Input('location') location: Location;

    constructor(public mapService: MapService) { }

    ngOnInit() {
    }
    
    private removeLocation(location: Location) {
        const response = confirm('Remove this place?');
        if (response) {
            this.mapService.removeLocation(location);
        }
    }

}
