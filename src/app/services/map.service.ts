import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { Location } from '../models/location';

@Injectable()
export class MapService {
    public map: L.Map;
    public baseMaps: any;

    locations: Location[];
    private nextId: number;

    constructor() {

        this.locations = []

        const osmAttr =
            'Peta wilayah Bandung &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'

        this.baseMaps = {
            OpenStreetMap: L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: osmAttr
            })
        };        
    }

    // save to local storage

    public getLocation(): Location[] {
        if (localStorage.getItem('locations') == null) {
            this.locations = [];
        }
        else {
            this.locations = JSON.parse(localStorage.getItem('locations'));
        }
        return this.locations;        
    }

    public addLocation(location: Location):void {
        this.locations.unshift(location);
        let locations;

        if (localStorage.getItem('locations') == null) {
            locations = [];
            locations.unshift(location);
            localStorage.setItem('locations', JSON.stringify(locations));            
        }
        else {
            locations = JSON.parse(localStorage.getItem('locations'));
            locations.unshift(location);
            localStorage.setItem('locations', JSON.stringify(locations));            
        }        
    }    

    public removeLocation(location: Location):void {
        for (let i = 0; this.locations.length; i++) {
            if (location == this.locations[i]) {
                this.locations.splice(i, 1);
                localStorage.setItem('locations', JSON.stringify(this.locations));
            }
        }   
    }

    // disableMouseEvent

    disableMouseEvent(elementId: string) {
        const element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }
}
