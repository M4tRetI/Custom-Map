import { Injectable } from '@angular/core';
import * as configData from '../app/data/config.json';
import * as contentData from '../app/data/content.json';


@Injectable ({
  providedIn: 'root'
})
export class PlatformCustomizationService {
  public static config: any;
  public static content: any;

  constructor () { }

  public static importCustomizations () {
    PlatformCustomizationService.config = configData as any ['default'];
    let _contentData = contentData as any ['default'];
    let _contentDataContents = _contentData['contents'];
    let compattedContentData: Array <any> = new Array <any> ();
    for (let card of _contentData["cards"]) {
      compattedContentData.push ({
        ...card, ..._contentDataContents[card["unique_id"]]
      });
    }
    PlatformCustomizationService.content = compattedContentData;
    console.log (compattedContentData);
  }
}
