import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { loginController }   from '../controllers/login/loginController';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ loginController ],
  bootstrap:    [ loginController ]
})
export class AppModule { }
