import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { fontAwesome_token } from './environments/secrets';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

(function () {
  let scriptNode = document.createElement ('script');
  scriptNode.src = `https://kit.fontawesome.com/${fontAwesome_token}.js`;
  scriptNode.async = true;
  scriptNode.crossOrigin = "anonymous";
  document.head.appendChild (scriptNode);
}) ();
