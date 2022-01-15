import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  static isDarkMode: boolean;

  constructor () {
    AppComponent.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}
