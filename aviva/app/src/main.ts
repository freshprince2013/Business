import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';

enableProdMode();
const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
