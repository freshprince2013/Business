import { NgModule }      from '@angular/core';
import { RouterModule }   from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { loginController }   from '../controllers/login/loginController';
import { homeController } from '../controllers/home/homeController';
import { errorController } from '../controllers/errorController';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "", pathMatch: "full" },
      { path: "login", component: loginController },
      { path: "home", component: homeController },
      { path: "**", component: errorController }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAYQqheDArL8eDL7vXcU-HWD7-BAsp6hYA'
    })
  ],
  declarations: [
    loginController,
    homeController,
    errorController
  ],
  bootstrap: [
    loginController
  ]
})
export class AppModule {
}
