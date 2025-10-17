import { Component, OnInit } from '@angular/core';
import { LoadMoreComponent } from './load-more/load-more.component';

@Component({
    selector: 'app-load-more-example',
    templateUrl: './load-more-example.component.html',
    styleUrls: ['./load-more-example.component.scss'],
    imports: [LoadMoreComponent]
})
export class LoadMoreExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
