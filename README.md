# Angular 4+ Utilities

Directives

 * [Control info directive](https://nglibrary.github.io/utils-documentation/control-info) 

...more to come soon!

### Install

```bash
yarn add @nglibrary/utils
```
### Import in your app

```ts
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { UtilsModule } from '@nglibrary/utils'; // <---

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    UtilsModule.forRoot( /* global config */ ) // <---
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
