import { Component, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { TreeNode } from '../models/tree-node.model';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'tree-node-content',
    encapsulation: ViewEncapsulation.None,
    template: `
  @if (!template) {
    <span>{{ node.displayField }}</span>
  }
  <ng-container [ngTemplateOutlet]="template"
    [ngTemplateOutletContext]="{ $implicit: node, node: node, index: index }" />`,
    imports: [NgTemplateOutlet]
})
export class TreeNodeContent {
  @Input() node: TreeNode;
  @Input() index: number;
  @Input() template: TemplateRef<any>;
}
