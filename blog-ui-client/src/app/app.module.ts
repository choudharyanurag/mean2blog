import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiRouteModuleModule } from './ui-route-module/ui-route-module.module'


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SplashpanelComponent } from './components/splashpanel/splashpanel.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SplashpanelComponent
  ],
  imports: [
    BrowserModule,
    UiRouteModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
