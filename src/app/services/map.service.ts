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
}
