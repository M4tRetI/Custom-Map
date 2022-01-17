import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import * as L from 'leaflet';
import { PlatformCustomizationService as PCS } from '../../services/platform-customization.service';

import { accessToken } from "../../environments/secrets";
import { Observable, Subscription } from 'rxjs';

/**
 * ATTENZIONE:
 * In caso di tanti marker conviene raggrupparli in clusters
 */


@Component ({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input () flytoEvent: Observable <any> = new Observable <any> ();
  flytoEventSubscription: Subscription = new Subscription ();
  map: L.Map = null as any;

  constructor () { }

  ngOnInit () {
    this.flytoEventSubscription = this.flytoEvent.subscribe (({ options, focusAction }) => this.flyTo (options, focusAction));
  }
  ngAfterViewInit () {
    this.initMap ();
    this.addSpots (PCS.content as Array <any>);
  }
  ngOnDestroy () {
    this.flytoEventSubscription.unsubscribe ();
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

  flyTo (options: any, focusAction: boolean) {
    let position: Array <number>;
    let zoom: number;
    let screenMapRatio: number;
    if (focusAction) {
      zoom = PCS.config?.map?.marker?.zoomForFocus;
      position = options;
      screenMapRatio = 30000;
    } else {
      position = options.position;
      zoom = options.zoom;
      screenMapRatio = 350000;
    }

    this.map.flyTo ({
      lat: position[0], 
      lng: position[1] - (screen.width * 0.2) / screenMapRatio
    }, zoom);
  }
}
