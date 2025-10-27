import { Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { ITreeOptions } from '../defs/api';
import { TreeViewportComponent } from './tree-viewport.component';
import { TreeNodeCollectionComponent } from './tree-node-collection.component';
import { TreeNodeDropSlot } from './tree-node-drop-slot.component';

@Component({
    selector: 'Tree, tree-root',
    providers: [TreeModel],
    styles: [],
    template: `
      <tree-viewport #viewport>
          <div
            class="angular-tree-component"
            [class.node-dragging]="treeDraggedElement.isDragging()"
            [class.angular-tree-component-rtl]="treeModel.options.rtl"
          >
            @if (treeModel.roots) {  
              <tree-node-collection
                [nodes]="treeModel.roots"
                [treeModel]="treeModel"
                [templates]="{
                  loadingTemplate: loadingTemplate,
                  treeNodeTemplate: treeNodeTemplate,
                  treeNodeWrapperTemplate: treeNodeWrapperTemplate,
                  treeNodeFullTemplate: treeNodeFullTemplate
                }" />
            }
            @if (treeModel.isEmptyTree()) {
              <tree-node-drop-slot
                class="empty-tree-drop-slot"
                [dropIndex]="0"
                [node]="treeModel.virtualRoot" />
            }
          </div>
      </tree-viewport>
  `,
    imports: [TreeViewportComponent, TreeNodeCollectionComponent, TreeNodeDropSlot]
})
export class TreeComponent implements OnChanges {
  treeModel = inject(TreeModel);
  treeDraggedElement = inject(TreeDraggedElement);

  _nodes: any[];
  _options: TreeOptions;

  @ContentChild('loadingTemplate', { static: false }) loadingTemplate: TemplateRef<any>;
  @ContentChild('treeNodeTemplate', { static: false }) treeNodeTemplate: TemplateRef<any>;
  @ContentChild('treeNodeWrapperTemplate', { static: false }) treeNodeWrapperTemplate: TemplateRef<any>;
  @ContentChild('treeNodeFullTemplate', { static: false }) treeNodeFullTemplate: TemplateRef<any>;
  @ViewChild('viewport', { static: false }) viewportComponent: TreeViewportComponent;

  // Will be handled in ngOnChanges
  @Input() set nodes(nodes: any[]) {
  };

  @Input() set options(options: ITreeOptions) {
  };

  @Input() set focused(value: boolean) {
    this.treeModel.setFocus(value);
  }

  @Input() set state(state) {
    this.treeModel.setState(state);
  }

  @Output() toggleExpanded;
  @Output() activate;
  @Output() deactivate;
  @Output() nodeActivate;
  @Output() nodeDeactivate;
  @Output() select;
  @Output() deselect;
  @Output() focus;
  @Output() blur;
  @Output() updateData;
  @Output() initialized;
  @Output() moveNode;
  @Output() copyNode;
  @Output() loadNodeChildren;
  @Output() changeFilter;
  @Output() event;
  @Output() stateChange;

  constructor() {
    this.treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
    this.treeModel.subscribeToState((state) => this.stateChange.emit(state));
  }

  @HostListener('body: keydown', ['$event'])
  onKeydown($event) {
    if (!this.treeModel.isFocused) return;
    if (['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) return;

    const focusedNode = this.treeModel.getFocusedNode();

    this.treeModel.performKeyAction(focusedNode, $event);
  }

  @HostListener('body: mousedown', ['$event'])
  onMousedown($event) {
    function isOutsideClick(startElement: Element, nodeName: string) {
      return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
    }

    if (isOutsideClick($event.target, 'tree-root')) {
      this.treeModel.setFocus(false);
    }
  }

  ngOnChanges(changes) {
    if (changes.options || changes.nodes) {
      this.treeModel.setData({
        options: changes.options && changes.options.currentValue,
        nodes: changes.nodes && changes.nodes.currentValue,
        events: this.pick(this, this.treeModel.eventNames)
      });
    }
  }

  sizeChanged() {
    this.viewportComponent.setViewport();
  }

  private pick(object, keys) {
    return keys.reduce((obj, key) => {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }
}
