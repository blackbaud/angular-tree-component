import { Component, Input, ViewEncapsulation, OnInit, OnDestroy, forwardRef } from '@angular/core';
import { reaction } from 'mobx';
import { observable, computed, action } from '../mobx-angular/mobx-proxy';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TreeNode } from '../models/tree-node.model';
import { TreeModel } from '../models/tree.model';
import { TreeMobxAutorunDirective } from '../mobx-angular/tree-mobx-autorun.directive';
import { NgTemplateOutlet } from '@angular/common';
import { TreeNodeDropSlot } from './tree-node-drop-slot.component';
import { TreeNodeWrapperComponent } from './tree-node-wrapper.component';
import { TreeAnimateOpenDirective } from '../directives/tree-animate-open.directive';
import { LoadingComponent } from './loading.component';


@Component({
    selector: 'tree-node-children',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div
        [class.tree-children]="true"
        [class.tree-children-no-padding]="node.options.levelPadding"
        *treeAnimateOpen="
          node.isExpanded;
          speed: node.options.animateSpeed;
          acceleration: node.options.animateAcceleration;
          enabled: node.options.animateExpand
        "
        >
        @if (node.children) {
          <tree-node-collection [nodes]="node.children"
            [templates]="templates"
            [treeModel]="node.treeModel"
             />
        }
        @if (!node.children) {
          <tree-loading-component [style.padding-left]="node.getNodePadding()"
            class="tree-node-loading"
            [template]="templates.loadingTemplate"
            [node]="node"
           />
        }
      </div>
    </ng-container>
    `,
    imports: [TreeMobxAutorunDirective, TreeAnimateOpenDirective, forwardRef(() => TreeNodeCollectionComponent), LoadingComponent]
})
export class TreeNodeChildrenComponent {
  @Input() node: TreeNode;
  @Input() templates: any;
}

@Component({
    selector: 'tree-node-collection',
    encapsulation: ViewEncapsulation.None,
    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.margin-top]="marginTop">
        @for (node of viewportNodes; track trackNode(i, node); let i = $index) {
          <tree-node [node]="node"
            [index]="i"
            [templates]="templates"
             />
        }
      </div>
    </ng-container>
    `,
    imports: [TreeMobxAutorunDirective, forwardRef(() => TreeNodeComponent)]
})
export class TreeNodeCollectionComponent implements OnInit, OnDestroy {
  @Input()
  get nodes() {
    return this._nodes;
  }
  set nodes(nodes) {
    this.setNodes(nodes);
  }

  @Input() treeModel: TreeModel;

  @observable _nodes;
  private virtualScroll: TreeVirtualScroll; // Cannot inject this, because we might be inside treeNodeTemplateFull
  @Input() templates;

  @observable viewportNodes: TreeNode[];

  @computed get marginTop(): string {
    const firstNode =
      this.viewportNodes && this.viewportNodes.length && this.viewportNodes[0];
    const relativePosition =
      firstNode && firstNode.parent
        ? firstNode.position -
          firstNode.parent.position -
          firstNode.parent.getSelfHeight()
        : 0;

    return `${relativePosition}px`;
  }

  _dispose = [];

  @action setNodes(nodes) {
    this._nodes = nodes;
  }

  ngOnInit() {
    this.virtualScroll = this.treeModel.virtualScroll;
    this._dispose = [
      // return node indexes so we can compare structurally,
      reaction(
        () => {
          return this.virtualScroll
            .getViewportNodes(this.nodes)
            .map(n => n.index);
        },
        nodeIndexes => {
          this.viewportNodes = nodeIndexes.map(i => this.nodes[i]);
        },
        { compareStructural: true, fireImmediately: true } as any
      ),
      reaction(
        () => this.nodes,
        nodes => {
          this.viewportNodes = this.virtualScroll.getViewportNodes(nodes);
        }
      )
    ];
  }

  ngOnDestroy() {
    this._dispose.forEach(d => d());
  }

  trackNode(index, node) {
    return node.id;
  }
}

@Component({
    selector: 'TreeNode, tree-node',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      @if (!templates.treeNodeFullTemplate) {
        <div
          [class]="node.getClass()"
          [class.tree-node]="true"
          [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
          [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
          [class.tree-node-leaf]="node.isLeaf"
          [class.tree-node-active]="node.isActive"
          [class.tree-node-focused]="node.isFocused"
          >
          @if (index === 0) {
            <tree-node-drop-slot [dropIndex]="node.index"
              [node]="node.parent"
             />
          }
          <tree-node-wrapper [node]="node"
            [index]="index"
            [templates]="templates"
           />
          <tree-node-children [node]="node"
            [templates]="templates"
           />
          <tree-node-drop-slot [dropIndex]="node.index + 1"
            [node]="node.parent"
           />
        </div>
      }
      <ng-container [ngTemplateOutlet]="templates.treeNodeFullTemplate"
        [ngTemplateOutletContext]="{
          $implicit: node,
          node: node,
          index: index,
          templates: templates
        }"
         />
    </ng-container>
    `,
    imports: [TreeMobxAutorunDirective, TreeNodeDropSlot, TreeNodeWrapperComponent, TreeNodeChildrenComponent, NgTemplateOutlet]
})
export class TreeNodeComponent {
  @Input() node: TreeNode;
  @Input() index: number;
  @Input() templates: any;
}



