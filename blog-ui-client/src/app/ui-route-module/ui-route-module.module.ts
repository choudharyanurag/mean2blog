import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component'
import { SplashpanelComponent } from '../components/splashpanel/splashpanel.component';


const appRoutes : Routes = [
  { path: '' , component: HomeComponent} ,
  { path: 'splash', component : SplashpanelComponent},
  { path: '**' , component: HomeComponent} 
  // ToDo path **
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports : [RouterModule]
})
export class UiRouteModuleModule { }
