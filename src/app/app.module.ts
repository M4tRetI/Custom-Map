import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { CardComponent } from './card/card.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { HomeComponent } from './home/home.component';
import { ArraybrPipe } from '../pipes/arraybr.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent,
    CardComponent,
    SidePanelComponent,
    HomeComponent,
    ArraybrPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
