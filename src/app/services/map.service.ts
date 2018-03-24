import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Location } from '../models/location';
import * as L from 'leaflet';


@Injectable()
export class MapService {
    public map: L.Map;
    public baseMaps: any;
    public latitude: L.LatLng;  
    public longitude: L.LatLng;

    locations: Location[];    

    constructor() {

        this.locations = [];

        const osmAttr =
            'Simple Map &copy; AMF & MAY | <a href="http://openstreetmap.org">OpenStreetMap</a>'

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

        let idxLoc = this.locations.findIndex(item => item == location);
        if (~idxLoc) {
            this.locations.splice(idxLoc,1);
            localStorage.locations = JSON.stringify(this.locations);
        }
    }

    // disableMouseEvent

    disableMouseEvent(elementId: string) {
        const element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }

    // get marker

    toggleMarkerAdd(clicked: boolean) {
        if (clicked) {
            console.log('mapp add toggle is on');
            this.map.on('click', this.addMarker.bind(this));
        }
        else {
            console.log('mapp add toggle is off');            
            this.map.off('click');
        }        
    }
    private addMarker(e: L.LeafletMouseEvent) {
        const shortLat = Math.round(e.latlng.lat * 1000000) / 1000000;
        const shortLng = Math.round(e.latlng.lng * 1000000) / 1000000;
        const popup = `<div>Latitude: ${shortLat}</div><div>Longitude: ${shortLng}</div>`;
        const icon = L.icon({
            iconUrl: 'assets/marker/marker-icon.png',
            shadowUrl: 'assets/marker/marker-shadow.png',
            iconAnchor: [15, 50],
            popupAnchor: [-15, -40],
        });

        const marker = L.marker(e.latlng, {
            draggable: true,
            icon
        })
        .bindPopup(popup, {
            offset: L.point(12,6)
        })
        .addTo(this.map)
        .openPopup();  

        marker.on('click', () => marker.remove());

        return this.latitude = shortLat, this.longitude = shortLng;
    }
}
