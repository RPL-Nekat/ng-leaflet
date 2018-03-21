import {LatLngBounds, LatLng} from 'leaflet';

export class Location{
    id: number;
    name: string;
    desc: string;
    latlng: LatLng;
    viewBounds: LatLngBounds;

        constructor(id: number, name: string, desc: string){
            this.id = id;
            this.name = name;
            this.desc = desc;
        }
}