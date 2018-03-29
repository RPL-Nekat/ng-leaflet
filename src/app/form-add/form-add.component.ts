import { Component, OnInit, EventEmitter, Input} from '@angular/core';
import { MapService } from '../services/map.service';
import { Location } from '../model/location';
import { Subject } from 'rxjs/Subject';
import * as L from 'leaflet';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css'],
})
export class FormAddComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();
  
  public locationName: string;
  public locationDesc: string;

  public downloadFromLocalStorage():void{
    var FileSaver = require('file-saver');
    var file = new File([localStorage.getItem('locations')], "Daftar Lokasi.txt", {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(file);
  }
  constructor(private mapService: MapService) {
    this.mapService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results;
    });

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
