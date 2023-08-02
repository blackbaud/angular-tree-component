# angular tree component
This is a fork of [@circlon/angular-tree-component](https://github.com/CirclonGroup/angular-tree-component). 
Since it appears that the original project has been abandoned, I have decided to take on its development and ensure compatibility with Ivy and newer versions of Angular.
## Getting started

Install `angular-tree-component`:

```npm install @blackbaud/angular-tree-component```

Import `TreeModule`:

```
import { TreeModule } from '@blackbaud/angular-tree-component';

@NgModule({
  declarations: [AppComponent],
  imports: [TreeModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Add css to `styles.scss` or include in `angular.json`:

```
@import '@blackbaud/angular-tree-component/css/angular-tree-component.css';
```

## Docs, Demos & More

## Support

## Angular supported version

angular-tree-component supports angular 14 and above, and AoT compilation.

## Contributing


