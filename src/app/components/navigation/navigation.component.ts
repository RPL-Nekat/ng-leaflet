import { Component, OnInit, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {    

	locations: Location[];

    @Input() search: string;
    markersOn: boolean;

    myControl: FormControl = new FormControl();
    options = [];
    filteredOptions: Observable<string[]>;

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
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(val => this.filter(val))
        );
        this.getTempat();
    }

    getTempat() {
        let place = JSON.parse(localStorage.getItem('locations'));
        let places = [];

        place.forEach(lok => {
            places.push(lok.name);
        });

        return this.options = places;
    }

    filter(val: string): string[] {
        return this.options.filter(option => option.toLowerCase().indexOf(val.toLowerCase()) === 0);
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
