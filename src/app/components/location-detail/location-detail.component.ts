import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MapService } from '../../services/map.service';
import { Location } from '../../models/location';

@Component({
	selector: 'app-location-detail',
	templateUrl: './location-detail.component.html',
	styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

	@Input('location') location: Location;

	constructor(
		private route: ActivatedRoute,
		private mapService: MapService
	) { }

	ngOnInit() {
	}
}
