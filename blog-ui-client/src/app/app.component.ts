import { Component } from '@angular/core';

/**
 * The root of the start.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  
  /**
   * The "constructor"
   */
  constructor(){
   this.title = 'TeMoLi blog'; 
  }

}
