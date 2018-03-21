import { LatLng } from "leaflet";

export interface Location {	
    name: string;
    desc: string;
    latlng: [LatLng.lat, LatLng.lng];
}
