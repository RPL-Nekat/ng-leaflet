import { Injectable } from '@angular/core';

import * as L from 'leaflet';

@Injectable()
export class MapService {
    public map: L.Map;
    public baseMaps: any;

    constructor() {
        const osmAttr =
            'Peta wilayah Bandung &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'

        this.baseMaps = {
            OpenStreetMap: L.tileLayer(
                'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: osmAttr
            })
        };
    }
}
