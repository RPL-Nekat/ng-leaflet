import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import * as L from 'leaflet';

import {Location} from '../model/location';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {
  public map: L.Map;
  public baseMaps: any;

  private locations: Location[];
  private nextId: number;

  constructor(private http: HttpClient) {
    this.locations = [];
    const osmAttr = 'Peta wilayah Bandung &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'

    this.baseMaps = {
      OpenStreetMap: L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: osmAttr
        })
    };
    let locations = this.getLocations();

    if(locations.length == 0){
      this.nextId = 0;
    } else {
      let maxId = locations[locations.length -1].id;
      this.nextId = maxId + 1;
    }
  }

  search(terms: Observable<string>){
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term){
    return this.http
      .get('https://nominatim.openstreetmap.org/search.php?q=' + term + '&format=jsonv2')
      .map(res => res)
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

  public removeLocation(id: number):void{
    let locations = this.getLocations();
    locations = locations.filter((location)=> location.id != id);
    this.setLocalStorage(locations);
  }
  private setLocalStorage(locations: Location[]):void{
    localStorage.setItem('locations', JSON.stringify({locations:locations}));
  }
}