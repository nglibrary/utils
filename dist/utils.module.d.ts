import { ModuleWithProviders } from '@angular/core';
import { UtilsGlobalConfig } from './utils.config';
export declare class UtilsModule {
    static forRoot(config: UtilsGlobalConfig): ModuleWithProviders;
    config: any;
    constructor(parentModule: UtilsModule, config: UtilsGlobalConfig);
}
