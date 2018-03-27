import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import * as L from 'leaflet';

import { Location } from '../models/location';


@Injectable()
export class GeocodeService {

	constructor(private http: HttpClient) { }

	baseUrl: string = 'https://nominatim.openstreetmap.org/search.php?q=';
	jsonUrl: string = '&format=jsonv2';

	search(terms: Observable<string>) {
	return terms.debounceTime(400)
	  .distinctUntilChanged()
	  .switchMap(term => this.searchEntries(term));
	}

	searchEntries(term) {
	return this.http
	    .get(this.baseUrl + term + this.jsonUrl)
	    .map(res => res);
	}

}
