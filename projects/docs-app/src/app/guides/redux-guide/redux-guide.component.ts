import { Component } from '@angular/core';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';

@Component({
    selector: 'app-redux-guide',
    templateUrl: './redux-guide.component.html',
    styleUrls: ['./redux-guide.component.scss'],
    imports: [CodeExampleComponent]
})
export class ReduxGuideComponent {
  options = `
options = {
  actionMapping: {
    mouse: {
      drop: (tree: TreeModel, node: TreeNode, $event: any, {from , to}: {from: any, to: any}) => {
        // custom action. parameters: from = node, to = {parent, index}
      }
    }
  }
}`;
}
