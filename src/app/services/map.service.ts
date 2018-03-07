import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { Location } from '../models/location';

@Injectable()
export class MapService {
    public map: L.Map;
    public baseMaps: any;

    private locations: Location[];
    private nextId: number;

    constructor() {
        const osmAttr =
            'Peta wilayah Bandung &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'

        this.baseMaps = {
            OpenStreetMap: L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: osmAttr
            })
        };

        this.locations = [];
        this.nextId = 1;
    }

    public addLocation(name: string, desc: string):void {
        let location = new Location(this.nextId, name, desc);
        this.locations.push(location);
        this.nextId++;
    }

    public getLocations(): Location[] {
        return this.locations;
    }

    public removeLocation(id: number):void {
        this.locations = this.locations.filter((location) => location.id != id);
    }

    disableMouseEvent(elementId: string) {
        const element = <HTMLElement>document.getElementById(elementId);

        L.DomEvent.disableClickPropagation(element);
        L.DomEvent.disableScrollPropagation(element);
    }

    toggleMarkerEditing(on: boolean) {
        if (on) {
            this.map.on('click', this.addMarker.bind(this));
        }
        else {
            this.map.off('click');
        }
    }

    private addMarker(e: L.leafletMouseEvent) {
        const shortLat = Math.round(e.latlng.lat * 1000000) / 1000000;
        const shortLng = Math.round(e.latlng.lng * 1000000) / 1000000;
        const popup = `<div>Latitude: ${shortLat}</div><div>Longitude: ${shortLng}</div>`;
        const icon = L.icon({
            iconUrl: 'assets/marker/marker-icon.png',
            shadowUrl: 'assets/marker/marker-shadow.png'
        });

        const marker = L.marker(e.latlng, {
            draggabble: false,
            icon
        })
        .bindPopup(popup, {
            offset: L.point(12, 6)
        })
        .addTo(this.map)
        .openPopup();

        marker.on('click', () => marker.remove());
    }

}
