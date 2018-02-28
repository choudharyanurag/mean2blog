import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.css']
})
export class ContentTileComponent implements OnInit {
  @Input() imageUrl;
  @Input() blogTitle ;
  @Input() summary;

  constructor() { }

  ngOnInit() {
  }

}
