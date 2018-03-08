import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    constructor(private mapService: MapService) { }

    ngOnInit() {
        const map = L.map('mapid', {
            zoomControl: false,
            center: L.latLng(-6.9218093, 107.6071324),
            zoom: 13,
            minZoom: 4,
            maxZoom: 18,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: "topright" }).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;
    }

}
