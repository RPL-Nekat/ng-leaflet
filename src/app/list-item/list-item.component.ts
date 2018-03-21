import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../services/map.service';
import { Location } from '../model/location';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  constructor(public mapService: MapService) { }

  ngOnInit() {
  }
}
