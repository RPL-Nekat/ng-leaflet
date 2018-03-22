import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { MapService } from '../../services/map.service';
import { Location } from '../../models/location';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {       

    locations: Location[];

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

        const icon = L.icon({
                iconUrl: 'assets/marker/marker-icon.png',
                shadowUrl: 'assets/marker/marker-shadow.png'
            });


        // load markers

        let coord = localStorage.getItem('locations');

        let coords = JSON.parse(coord);

        coords.forEach(lokasi => {

            const popup = `<h3><b>${lokasi.name}</b></h3><div>Latitude: ${lokasi.latlng[0]}</div><div>Longitude: ${lokasi.latlng[1]}</div>`;
            console.log(lokasi.latlng);
            const marker = L.marker(lokasi.latlng, {
                draggable: true,
                icon
            })
            .bindPopup(popup, {
                offset: L.point(12,6)
            })
            .addTo(map)
            .openPopup();
        });
            
        this.mapService.map = map;           
    }       
}