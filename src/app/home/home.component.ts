import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatformCustomizationService as PCS } from 'src/services/platform-customization.service';

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public flytoEventSubject: Subject <any> = new Subject <any> ()
  public static sidePanelIsReduced = false;
  public static sidePanelIsFocused = false;

  public get staticSidePanelIsReduced () { return HomeComponent.sidePanelIsReduced; }

  constructor () { }
  
  ngOnInit () { }

  public toggleSidePanel () {
    HomeComponent.sidePanelIsReduced = !HomeComponent.sidePanelIsReduced;
    document.querySelector ('#header')?.classList.toggle ('maximize');
    document.querySelector ('#side-panel')?.classList.toggle ('reduced');
    document.querySelector ('#toggle-sidePanel')?.classList.toggle ('sidePanel-reduced');
  }

  public cardFocused (card: any) {
    HomeComponent.sidePanelIsFocused = true;
    document.querySelector ('#header')?.classList.add ('maxi-reduced');
    document.querySelector ('#side-panel')?.classList.add ('focused');
    document.querySelector ('#toggle-sidePanel')?.classList.add ('sidePanel-focused');
    this.flytoEventSubject.next ({
      options: card.coord,
      focusAction: true,
    });
  }
  public cardBlurred (card: any) {
    HomeComponent.sidePanelIsFocused = false;
    document.querySelector ('#header')?.classList.remove ('maxi-reduced');
    document.querySelector ('#side-panel')?.classList.remove ('focused');
    document.querySelector ('#toggle-sidePanel')?.classList.remove ('sidePanel-focused');
    this.flytoEventSubject.next ({
      options: PCS.config['map']['initial'],
      focusAction: false,
    });
  }
}
