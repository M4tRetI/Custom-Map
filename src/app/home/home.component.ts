import { Component, OnInit } from '@angular/core';

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isSidePanelReduced = false;

  constructor () { }
  
  ngOnInit () { }

  public toggleSidePanel () {
    this.isSidePanelReduced = !this.isSidePanelReduced;
    document.querySelector ('#side-panel')?.classList.toggle ('reduced');
    document.querySelector ('#header')?.classList.toggle ('reduced');
    document.querySelector ('#toggle-sidePanel')?.classList.toggle ('sidePanel-reduced');
  }
}
