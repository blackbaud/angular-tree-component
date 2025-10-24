import { Component, ElementRef, AfterViewInit, OnInit, OnDestroy, inject } from '@angular/core';
import { TreeVirtualScroll } from '../models/tree-virtual-scroll.model';
import { TREE_EVENTS } from '../constants/events';
import { TreeMobxAutorunDirective } from '../mobx-angular/tree-mobx-autorun.directive';

@Component({
    selector: 'tree-viewport',
    styles: [],
    providers: [TreeVirtualScroll],
    template: `
    <ng-container *treeMobxAutorun="{ dontDetach: true }">
      <div [style.height]="getTotalHeight()">
        <ng-content />
      </div>
    </ng-container>
  `,
    imports: [TreeMobxAutorunDirective]
})
export class TreeViewportComponent implements AfterViewInit, OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  virtualScroll = inject(TreeVirtualScroll);

  setViewport = this.throttle(() => {
    this.virtualScroll.setViewport(this.elementRef.nativeElement);
  }, 17);

  private readonly scrollEventHandler: ($event: Event) => void;

  constructor() {
    this.scrollEventHandler = this.setViewport.bind(this);
  }

  ngOnInit() {
    this.virtualScroll.init();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setViewport();
      this.virtualScroll.fireEvent({ eventName: TREE_EVENTS.initialized });
    });
    let el: HTMLElement = this.elementRef.nativeElement;
    el.addEventListener('scroll', this.scrollEventHandler);
  }

  ngOnDestroy() {
    this.virtualScroll.clear();
    let el: HTMLElement = this.elementRef.nativeElement;
    el.removeEventListener('scroll', this.scrollEventHandler);
  }

  getTotalHeight() {
    return (
      (this.virtualScroll.isEnabled() &&
        this.virtualScroll.totalHeight + 'px') ||
      'auto'
    );
  }

  private throttle(func, timeFrame) {
    let lastTime = 0;
    return function () {
      let now = Date.now();
      if (now - lastTime >= timeFrame) {
        func();
        lastTime = now;
      }
    };
  }
}
