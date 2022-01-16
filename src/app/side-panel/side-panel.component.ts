import { Component, OnInit } from '@angular/core';
import { PlatformCustomizationService as PCS } from '../../services/platform-customization.service';

@Component ({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  public page = {
    name: "",
    description: "",
  }

  public cards: Array <any> = new Array <any> ();

  constructor () { }

  ngOnInit () {
    this.page.name = PCS.config['page-name'];
    this.page.description = PCS.config['page-description'];

    this.cards = PCS.content;
  }

}
