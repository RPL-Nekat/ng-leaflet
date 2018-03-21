import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../services/map.service';
import { Location } from '../model/location';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input()
  private location: Location;

  constructor(public mapService: MapService) { }

  ngOnInit() {
  }

  private removeLocation(id: number):void{
    this.mapService.removeLocation(this.location.id);
  }
  refresh(): void {
    window.location.reload();
  }
}
