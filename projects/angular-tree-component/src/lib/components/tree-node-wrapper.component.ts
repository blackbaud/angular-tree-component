import { Component , Input , ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { TreeNodeCheckboxComponent } from './tree-node-checkbox.component';
import { TreeNodeExpanderComponent } from './tree-node-expander.component';
import { TreeDragDirective } from '../directives/tree-drag.directive';
import { TreeDropDirective } from '../directives/tree-drop.directive';
import { TreeNodeContent } from './tree-node-content.component';

@Component({
    selector: 'tree-node-wrapper',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `
      <div *ngIf="!templates.treeNodeWrapperTemplate" class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          <tree-node-checkbox *ngIf="node.options.useCheckbox" [node]="node"></tree-node-checkbox>
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper"
               [class.node-content-wrapper-active]="node.isActive"
               [class.node-content-wrapper-focused]="node.isFocused"
               (click)="node.mouseAction('click', $event)"
               (dblclick)="node.mouseAction('dblClick', $event)"
               (mouseover)="node.mouseAction('mouseOver', $event)"
               (mouseout)="node.mouseAction('mouseOut', $event)"
               (contextmenu)="node.mouseAction('contextMenu', $event)"
               (treeDrop)="node.onDrop($event)"
               (treeDropDragOver)="node.mouseAction('dragOver', $event)"
               (treeDropDragLeave)="node.mouseAction('dragLeave', $event)"
               (treeDropDragEnter)="node.mouseAction('dragEnter', $event)"
               [treeAllowDrop]="node.allowDrop"
               [allowDragoverStyling]="node.allowDragoverStyling()"
               [treeDrag]="node"
               [treeDragEnabled]="node.allowDrag()">

              <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate">
              </tree-node-content>
          </div>
      </div>
      <ng-container
              [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
              [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }">
      </ng-container>
  `,
    imports: [NgIf, TreeNodeCheckboxComponent, TreeNodeExpanderComponent, TreeDragDirective, TreeDropDirective, TreeNodeContent, NgTemplateOutlet]
})

export class TreeNodeWrapperComponent {

  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;

}
