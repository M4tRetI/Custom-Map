import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlatformCustomizationService as PCS } from '../../services/platform-customization.service';
import { environment } from 'src/environments/environment';

@Component ({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent implements OnInit {
  @Output () cardFocused: EventEmitter <any> = new EventEmitter <any> ();
  @Output () cardBlurred: EventEmitter <any> = new EventEmitter <any> ();

  public environment = environment;
  public page = {
    name: "",
    description: "",
  }
  public focusedCard: any = undefined;
  public cards: Array <any> = new Array <any> ();

  constructor () { }

  ngOnInit () {
    this.page.name = PCS.config['page-name'];
    this.page.description = PCS.config['page-description'];

    this.cards = PCS.content;
  }

  public focusCard (card_uid: string) {
    const divContainerList = document.querySelector ('div.container.list'); 
    divContainerList?.classList.remove ('list');
    divContainerList?.classList.add ('focus');
    
    this.focusedCard = this.cards.find (card => card.unique_id === card_uid);
    this.cardFocused.emit (this.focusedCard);
    divContainerList?.scrollTo (0, 0);
  }
  public blurCard (card_uid: string) {
    const divContainerList = document.querySelector ('div.container.focus'); 
    divContainerList?.classList.add ('list');
    divContainerList?.classList.remove ('focus');
    
    this.cardBlurred.emit (this.focusedCard);
    divContainerList?.scrollTo (0, 0);
  }
}
