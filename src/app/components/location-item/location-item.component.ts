import { Component, OnInit, Input} from '@angular/core';

import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.css']
})
export class LocationItemComponent implements OnInit {

    @Input()
    private location: Location;

    constructor(private mapService: MapService) { }

    ngOnInit() {
    }
    private removeLocation():void {
        this.mapService.removeLocation(this.location.id);
    }

}
