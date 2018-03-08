import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-location-add',
    templateUrl: './location-add.component.html',
    styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

    name: string;
    desc: string;
    @Output() locationAdded = new EventEmitter<Location>();

    constructor(
        public snackBar: MatSnackBar,
        private mapService: MapService
    ) { }

    ngOnInit() {
    }

    addLocation() {
        this.locationAdded.emit({
            name: this.name,
            desc: this.desc
        });
        this.name = '';
        this.desc = '';
    }

    openSnackBar() {
    this.snackBar.open('Location info was saved', 'close', {
      duration: 2000,
    });    
  }

}
