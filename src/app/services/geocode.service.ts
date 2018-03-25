import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as L from 'leaflet';

import { Location } from '../models/location';


@Injectable()
export class GeocodeService {

	public hasilpencarian = [];

	constructor(private http: HttpClient) { }

	pencarian(search: string): Observable<Location[]> {
		const encoded = encodeURIComponent(search);

		return this.http
			.get<Location[]>(`https://nominatim.openstreetmap.org/search.php?q=${encoded}&format=jsonv2`);
	}

}
