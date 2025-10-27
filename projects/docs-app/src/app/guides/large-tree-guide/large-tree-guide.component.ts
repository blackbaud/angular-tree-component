import { Component } from '@angular/core';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';
import { LargeTreeComponent } from './large-tree/large-tree.component';

@Component({
    selector: 'app-large-tree-guide',
    templateUrl: './large-tree-guide.component.html',
    styleUrls: ['./large-tree-guide.component.scss'],
    imports: [CodeExampleComponent, LargeTreeComponent]
})
export class LargeTreeGuideComponent {

  html = `
<div style="height: 400px">
  <tree-root [nodes]="nodes" [options]="options"></tree-root>
</div>`;

  javascript = `
// Fixed node height
options = {
  useVirtualScroll: true,
  nodeHeight: 22
}

// Or using a function
options = {
  useVirtualScroll: true,
  nodeHeight: (node: TreeNode) => node.myHeight,
  dropSlotHeight: 3
}`;

}
