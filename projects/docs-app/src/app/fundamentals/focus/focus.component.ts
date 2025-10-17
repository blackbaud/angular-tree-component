import { Component } from '@angular/core';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';

@Component({
    selector: 'app-focus',
    templateUrl: './focus.component.html',
    styleUrls: ['./focus.component.scss'],
    imports: [CodeExampleComponent]
})
export class FocusComponent {
  focus = `<tree-root [nodes]="nodes" [focused]="true" [options]="options"></tree-root>`;
}
