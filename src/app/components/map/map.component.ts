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

    public map: L.map;

    public icon = L.icon({
                iconUrl: 'assets/marker/marker-icon.png',
                shadowUrl: 'assets/marker/marker-shadow.png',
                iconAnchor: [15, 50],
                popupAnchor: [-15, -40],
        });

    locations: Location[];

    constructor(private mapService: MapService) { }

    ngOnInit() {
        this.map = L.map('mapid', {
            zoomControl: false,
            center: L.latLng(-6.9218093, 107.6071324),
            zoom: 13,
            minZoom: 4,
            maxZoom: 18,
            layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: "topright" }).addTo(this.map);
        L.control.scale().addTo(this.map);                       

        // load markers
        this.loadmarker();
            
        this.mapService.map = this.map;           
    }    

    loadmarker() {
        let coord = localStorage.getItem('locations');

        let coords = JSON.parse(coord);

        if (coords == null) return;
        else {
            coords.forEach(lokasi => {

                const popup = `<h3><b>${lokasi.name}</b></h3><p>${lokasi.desc}</p><div>Latitude: ${lokasi.latlng[0]}</div><div>Longitude: ${lokasi.latlng[1]}</div>`;
                const marker = L.marker(lokasi.latlng, {
                    draggable: false,
                    icon: this.icon
                })
                .bindPopup(popup, {
                    offset: L.point(12,6)
                })
                .addTo(this.map)
                .openPopup();

                marker.on('click', () => {
                    // let bounds = lokasi.viewBounds
                    // this.mapService.fitBounds(bounds);
                    this.mapService.map.panTo(lokasi.latlng);
                    return this.mapService.name = lokasi.name, this.mapService.desc = lokasi.desc, this.mapService.latitude = lokasi.latlng[0], this.mapService.longitude = lokasi.latlng[1];
                })                
            });
        }     
    }
}