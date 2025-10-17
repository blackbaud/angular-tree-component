import { Component, OnInit } from '@angular/core';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';

@Component({
    selector: 'app-nodes',
    templateUrl: './nodes.component.html',
    styleUrls: ['./nodes.component.scss'],
    imports: [CodeExampleComponent]
})
export class NodesComponent implements OnInit {

  nodes = `[
  {
    id: 1,
    name: 'root1',
    children: [
      { id: 2, name: 'child1' },
      { id: 3, name: 'child2' }
    ]
  }
]`;

  constructor() { }

  ngOnInit(): void {
  }

}
