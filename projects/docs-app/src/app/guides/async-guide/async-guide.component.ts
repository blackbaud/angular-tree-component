import { Component } from '@angular/core';
import { AsyncComponent } from './async/async.component';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';

@Component({
    selector: 'app-async-guide',
    templateUrl: './async-guide.component.html',
    styleUrls: ['./async-guide.component.scss'],
    imports: [AsyncComponent, CodeExampleComponent]
})
export class AsyncGuideComponent {

  javascript =
`
options = {
  getChildren: (node:TreeNode) => {
    return request('/api/children/' + node.id);
  }
}

nodes = [
  {
    name: 'asyncRoot',
    hasChildren: true
  },
  {
    name: 'root2',
    children: [
      {
        name: 'leaf',
        hasChildren: false
      }
    ]
  }
]
`;

}
