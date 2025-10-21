import { Component } from '@angular/core';
import { ColumnsComponent } from './columns/columns.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-columns-example',
    templateUrl: './columns-example.component.html',
    styleUrls: ['./columns-example.component.scss'],
    imports: [ColumnsComponent, RouterLink]
})
export class ColumnsExampleComponent {}
