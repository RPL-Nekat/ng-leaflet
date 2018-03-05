import { Component, OnInit } from '@angular/core';

import * as L from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      var mymap = L.map('mapid').setView([-6.9218093, 107.6071324], 18);

      //Set Map-Layer
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Peta wilayah Bandung &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(mymap);
  }

}
