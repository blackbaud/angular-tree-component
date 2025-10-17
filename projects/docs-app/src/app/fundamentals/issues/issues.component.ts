import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-issues',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.scss'],
    imports: [RouterLink]
})
export class IssuesComponent {
  // TODO: add drag/drop
}
