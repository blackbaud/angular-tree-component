import { Component } from '@angular/core';
import { CodeExampleComponent } from '../custom-elements/code/code-example.component';

@Component({
    selector: 'app-getting-started',
    templateUrl: './getting-started.component.html',
    styleUrls: ['./getting-started.component.scss'],
    imports: [CodeExampleComponent]
})
export class GettingStartedComponent {}
