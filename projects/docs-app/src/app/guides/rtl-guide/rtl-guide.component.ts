import { Component } from '@angular/core';
import { RtlComponent } from './rtl/rtl.component';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';

@Component({
    selector: 'app-rtl-guide',
    templateUrl: './rtl-guide.component.html',
    styleUrls: ['./rtl-guide.component.scss'],
    imports: [RtlComponent, CodeExampleComponent]
})
export class RtlGuideComponent {
  html = `<tree-root [focused]="true" [nodes]="nodes" [options]="options"></tree-root>`;
  javascript = `
options = {
  rtl: true
};
`;
}
