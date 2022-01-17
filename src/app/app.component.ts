import { Component } from '@angular/core';
import { PlatformCustomizationService as PCS } from 'src/services/platform-customization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static isDarkMode: boolean;

  constructor () {
    AppComponent.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    PCS.importCustomizations ();
    window.dispatchEvent (new CustomEvent ('PCSLoaded'));
    AppComponent.isDarkMode = AppComponent.isDarkMode && PCS.config['page-settings']['autoTheme'];
    document.documentElement.setAttribute ("page-theme", (AppComponent.isDarkMode ? "dark" : "light")); 
  }
}
