import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import {MapService} from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  ngOnInit() {
    const mymap = L.map('mapid',{
      zoomControl: false,
      center: L.latLng(-6.9218093, 107.6071324),
      zoom: 13,
      minZoom: 4,
      maxZoom: 18,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: "topright"}).addTo(mymap);
    L.control.scale().addTo(mymap);

    this.mapService.map = mymap;
    
    var marker = L.marker([-6.9218093, 107.6071324]).addTo(mymap);

    function onMapClick(e) {
      marker
        .setLatLng(e.latlng)
        .bindPopup(e.latlng.toString())
        .openOn(mymap);
    }

    mymap.on('click', onMapClick);
  }
}
