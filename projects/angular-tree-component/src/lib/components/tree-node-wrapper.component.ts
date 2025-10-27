import { Component , Input , ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { NgTemplateOutlet } from '@angular/common';
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
      @if (!templates.treeNodeWrapperTemplate) {
        <div class="node-wrapper" [style.padding-left]="node.getNodePadding()">
          @if (node.options.useCheckbox) {
            <tree-node-checkbox [node]="node" />
          }
          <tree-node-expander [node]="node" />
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
            <tree-node-content [node]="node" [index]="index" [template]="templates.treeNodeTemplate" />
          </div>
        </div>
      }
      <ng-container [ngTemplateOutlet]="templates.treeNodeWrapperTemplate"
        [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index, templates: templates }" />
      `,
    imports: [TreeNodeCheckboxComponent, TreeNodeExpanderComponent, TreeDragDirective, TreeDropDirective, TreeNodeContent, NgTemplateOutlet]
})

export class TreeNodeWrapperComponent {

  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;

}
