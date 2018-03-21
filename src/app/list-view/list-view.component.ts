import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../model/location';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  
  constructor(private mapService: MapService) { }
  locations: Location[]

  ngOnInit() {
    this.locations = this.mapService.getLocations();
  }
}
