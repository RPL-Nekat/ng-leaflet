import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-location-add',
    templateUrl: './location-add.component.html',
    styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

    public locationName: string;
    public locationDesc: string;

    constructor(
        public snackBar: MatSnackBar,
        private mapService: MapService
    ) {
        this.locationName = '';
        this.locationDesc = '';
    }

    ngOnInit() {
    }

    openSnackBar() {
    this.snackBar.open('Location info was saved', 'close', {
      duration: 2000,
    });

    private addLocation(): void {
        this.mapService.addLocation(this.locationName, this.locationDesc);
        this.locationName = '';
        this.locationDesc = '';
    }
  }

}
