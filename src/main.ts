import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';

// In order to use the italian euro format
registerLocaleData(localeIt);

platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
})
    .catch(err => console.error(err));
