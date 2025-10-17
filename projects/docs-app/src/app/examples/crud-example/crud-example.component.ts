import { Component, OnInit } from '@angular/core';
import { CrudComponent } from './crud/crud.component';

@Component({
    selector: 'app-crud-example',
    templateUrl: './crud-example.component.html',
    styleUrls: ['./crud-example.component.scss'],
    imports: [CrudComponent]
})
export class CrudExampleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
