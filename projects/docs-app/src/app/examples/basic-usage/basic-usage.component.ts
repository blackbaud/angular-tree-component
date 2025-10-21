import { Component } from '@angular/core';
import { BasicTreeComponent } from './basic-tree/basic-tree.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-basic-usage',
    templateUrl: './basic-usage.component.html',
    styleUrls: ['./basic-usage.component.scss'],
    imports: [BasicTreeComponent, RouterLink]
})
export class BasicUsageComponent {

  nodes = [
    {
      name: 'root1',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'root2',
      children: [
        { name: 'child2.1', children: [] },
        { name: 'child2.2', children: [
            {name: 'grandchild2.2.1'}
          ] }
      ]
    },
    { name: 'root3' },
    { name: 'root4', children: [] },
    { name: 'root5', children: null }
  ];
}
