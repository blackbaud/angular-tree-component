import { Component } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { CodeExampleComponent } from '../../custom-elements/code/code-example.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-filter-guide',
    templateUrl: './filter-guide.component.html',
    styleUrls: ['./filter-guide.component.scss'],
    imports: [FilterComponent, CodeExampleComponent, RouterLink]
})
export class FilterGuideComponent {
  functionFilter =
`
tree.treeModel.filterNodes((node) => {
  return !node.data.name.startsWith(text);
});
`;
}
