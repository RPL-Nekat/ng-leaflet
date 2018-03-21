import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { MapService } from '../services/map.service';
import { Location } from '../model/location';
@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  
  public locationName: string;
  public locationDesc: string;

  constructor(private mapService: MapService) {
    this.locationName = '';
    this.locationDesc = '';
   }

  ngOnInit() {
  }

  private addLocation():void{
    this.mapService.addLocation(this.locationName, this.locationDesc);
    this.locationName = '';
    this.locationDesc= '';
    alert("success to add!");
  }
  refresh(): void {
    window.location.reload();
}
}
