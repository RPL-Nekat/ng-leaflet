import { Component, OnInit, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Location } from '../../models/location';
import { MapService } from '../../services/map.service';
import { GeocodeService } from '../../services/geocode.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs/Subject';

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

    results: Object;
    searchTerm$ = new Subject<string>();

    constructor(
        public snackBar: MatSnackBar,
        private mapService: MapService,
        private geocode: GeocodeService
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

    cariLokasi() {
        this.geocode.search(this.searchTerm$)
            .subscribe(results => {
                this.results = results;
            });        
    }

    addLocation(location: Location) {
    	this.mapService.addLocation(location);
    }

    toggleMarkers(clicked: boolean) {
        this.markersOn = clicked;
        this.mapService.toggleMarkerAdd(this.markersOn);
    }


}
