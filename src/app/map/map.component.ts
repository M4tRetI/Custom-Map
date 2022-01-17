import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import * as L from 'leaflet';
import { PlatformCustomizationService as PCS } from '../../services/platform-customization.service';

import { accessToken } from "../../environments/secrets";


@Component ({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: L.Map = null as any;

  constructor () { }

  ngOnInit () { }

  ngAfterViewInit () {
    this.initMap ();
    this.addSpots (PCS.content as Array <any>);
  }

  initMap () {
    let map_type = (AppComponent.isDarkMode ? 'dark' : 'sunny');
    let center_map = PCS.config['map']['initial']['position'];
    center_map [1] -= (screen.width * 0.65) / 22000;
    this.map = L.map ('map', {
      center: center_map,
      zoom: PCS.config['map']['initial']['zoom'],
    });
    
    L.tileLayer('https://{s}.tile.jawg.io/jawg-' + map_type + '/{z}/{x}/{y}{r}.png?access-token=' + (PCS.config['accessToken']['jawg_map'] || accessToken), {
	    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    minZoom: PCS.config['map']['minZoom'],
	    maxZoom: PCS.config['map']['maxZoom']
    }).addTo (this.map);
  }

  addSpots (markers: Array <any>) {
    let markerIcon = L.icon ({
      iconUrl: "../assets/" + PCS.config['map']['marker']['icon'],
      iconSize: PCS.config['map']['marker']['size'],
      iconAnchor: PCS.config['map']['marker']['anchor']
    });

    markers.forEach (marker => {
      L.marker (marker.coord, {
        icon: markerIcon,
        title: marker.title
      }).addTo (this.map);
    });
  }
}
