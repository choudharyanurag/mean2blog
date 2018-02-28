import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiRouteModuleModule } from './ui-route-module/ui-route-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SplashpanelComponent } from './components/splashpanel/splashpanel.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthService } from './services/auth.service';
import { AppHttpService } from './services/app-http.service';
import { ContentTileComponent } from './components/content-tile/content-tile.component';

/**
 * Module to invoke application
 */

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SplashpanelComponent,
    RegistrationComponent,
    ContentTileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    UiRouteModuleModule,
  ],
  providers: [
    AuthService,
    AppHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
