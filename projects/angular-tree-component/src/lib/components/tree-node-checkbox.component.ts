import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeMobxAutorunDirective } from '../mobx-angular/tree-mobx-autorun.directive';

@Component({
    selector: 'tree-node-checkbox',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <input
        class="tree-node-checkbox"
        type="checkbox"
        (click)="node.mouseAction('checkboxClick', $event)"
        [checked]="node.isSelected"
        [indeterminate]="node.isPartiallySelected"
      />
    </ng-container>
  `,
    imports: [TreeMobxAutorunDirective]
})
export class TreeNodeCheckboxComponent {
  @Input() node: TreeNode;
}
