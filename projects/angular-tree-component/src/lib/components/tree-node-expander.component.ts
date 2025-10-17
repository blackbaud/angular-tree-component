import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { TreeMobxAutorunDirective } from '../mobx-angular/tree-mobx-autorun.directive';
import { NgIf } from '@angular/common';

@Component({
    selector: 'tree-node-expander',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <span
        *ngIf="node.hasChildren"
        [class.toggle-children-wrapper-expanded]="node.isExpanded"
        [class.toggle-children-wrapper-collapsed]="node.isCollapsed"
        class="toggle-children-wrapper"
        (click)="node.mouseAction('expanderClick', $event)"
      >
        <span class="toggle-children"></span>
      </span>
      <span *ngIf="!node.hasChildren" class="toggle-children-placeholder">
      </span>
    </ng-container>
  `,
    imports: [TreeMobxAutorunDirective, NgIf]
})
export class TreeNodeExpanderComponent {
  @Input() node: TreeNode;
}
