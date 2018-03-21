import { Injectable } from '@angular/core';
import * as L from 'leaflet';

import {Location} from '../model/location';

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;

  private locations: Location[];
  private nextId: number;

  constructor() {
    this.locations = [];
    const osmAttr = 'Peta wilayah Bandung &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: osmAttr
        })
    };
    let locations = this.getLocations();

    if(locations.length ==0){
      this.nextId = 0;
    } else {
      let maxId = locations[locations.length -1].id;
      this.nextId = maxId + 1;
    }
  }

  public addLocation(name: string, desc: string):void{
    let location = new Location(this.nextId, name, desc);
    let locations = this.getLocations();
    locations.push(location);

    this.setLocalStorage(locations);
    this.nextId++;
  }

  public getLocations(): Location[]{
    let localStorageItem = JSON.parse(localStorage.getItem('locations'));
    return localStorageItem == null ? [] : localStorageItem.locations;
  }

  private setLocalStorage(locations: Location[]):void{
    localStorage.setItem('locations', JSON.stringify({locations:locations}));
  }

  public removeLocation(location: Location):void{
    for (let i = 0; this.locations.length; i++){
      if(location == this.locations[i]){
        this.locations.splice(i, 1);
        localStorage.setItem('locations', JSON.stringify(this.locations));
      }
    }
  }
}