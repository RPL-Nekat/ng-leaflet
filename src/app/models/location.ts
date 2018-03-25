import { LatLng, LatLngBounds } from "leaflet";

export interface Location {	
    name: string;
    desc: string;
    latlng: [LatLng.lat, LatLng.lng];
    viewBounds: LatLngBounds;
}
