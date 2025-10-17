import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';
import { ElementsLoader } from './elements-loader';
import { Logger } from '../shared/logger.service';

@Component({
    selector: 'aio-lazy-ce',
    template: ''
})
export class LazyCustomElementComponent implements OnInit {
  private elementRef = inject(ElementRef);
  private elementsLoader = inject(ElementsLoader);
  private logger = inject(Logger);

  @Input() selector = '';

  ngOnInit() {
    if (!this.selector || /[^\w-]/.test(this.selector)) {
      this.logger.error(new Error(`Invalid selector for 'aio-lazy-ce': ${this.selector}`));
      return;
    }

    this.elementRef.nativeElement.innerHTML = `<${this.selector}></${this.selector}>`;
    this.elementsLoader.loadCustomElement(this.selector);
  }
}
