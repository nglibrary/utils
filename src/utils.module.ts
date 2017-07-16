import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
  } from '@angular/core';
import { ControlInfoDirective } from './directives/control-info/control-info.directive';
import { UtilsGlobalConfig } from './utils.config';

@NgModule({
  declarations: [
    ControlInfoDirective
  ],
  exports: [
    ControlInfoDirective
  ]
})
export class UtilsModule {
  static forRoot(config: UtilsGlobalConfig): ModuleWithProviders {
    return {
      ngModule: UtilsModule,
      providers: [
        { provide: UtilsGlobalConfig, useValue: config }
      ]
    };
  }
  config;
  constructor(
    @Optional() @SkipSelf() parentModule: UtilsModule,
    @Optional() config: UtilsGlobalConfig) {
    this.config = config || [];
    if (parentModule) {
      throw new Error(
        'UtilsModule is already loaded. Import it in the AppModule only');
    }
  }
}
