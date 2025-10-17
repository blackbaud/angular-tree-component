import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutoScrollComponent } from './auto-scroll/auto-scroll.component';

@Component({
    selector: 'app-auto-scroll-guide',
    templateUrl: './auto-scroll-guide.component.html',
    styleUrls: ['./auto-scroll-guide.component.scss'],
    imports: [RouterLink, AutoScrollComponent]
})
export class AutoScrollGuideComponent {
}
