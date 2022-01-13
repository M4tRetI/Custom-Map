import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import * as L from 'leaflet';

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
  }

  initMap () {
    let map_type = (AppComponent.isDarkMode ? 'dark' : 'sunny');
    
    this.map = L.map ('map', {
      center: [51.505, -0.09],
      zoom: 13,
    });
    
    L.tileLayer('https://{s}.tile.jawg.io/jawg-' + map_type + '/{z}/{x}/{y}{r}.png?access-token=' + accessToken, {
	    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	    minZoom: 0,
	    maxZoom: 30,
	    accessToken: accessToken
    }).addTo (this.map);
  }
}
