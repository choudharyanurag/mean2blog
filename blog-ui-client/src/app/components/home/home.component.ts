import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  blogList;

  constructor() {
    this.blogList = [
      { imageUrl : '../../assets/cpu.png', 
        blogTitle : 'Tech' , 
        summary : 'The world is changing, accelerated by technology'},
      { imageUrl : '../../assets/video-play.png', 
        blogTitle : 'Movies' , 
        summary : 'The perfect dosage of entertainment!'},
      { imageUrl : '../../assets/virus.png', 
        blogTitle : 'Life' , 
        summary : 'Lets talk life and your conquering experience.'}
    ];
   }

  ngOnInit() {
  }

}
