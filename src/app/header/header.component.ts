import { Component, OnInit } from '@angular/core';
import { PlatformCustomizationService as PCS } from 'src/services/platform-customization.service';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public organization = {
    name: "",
    icon: "../assets/"
  };

  constructor () { }

  ngOnInit () {
    this.organization.name = PCS.config['page-organization']['name'];
    this.organization.icon += PCS.config['page-organization']['icon'];
  }

}
