import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ControlInfoDirective } from './directives/control-info/control-info.directive';
import { UtilsGlobalConfig } from './utils.config';
var UtilsModule = (function () {
    function UtilsModule(parentModule, config) {
        this.config = config || [];
        if (parentModule) {
            throw new Error('UtilsModule is already loaded. Import it in the AppModule only');
        }
        console.log('config', config);
    }
    UtilsModule.forRoot = function (config) {
        return {
            ngModule: UtilsModule,
            providers: [
                { provide: UtilsGlobalConfig, useValue: config }
            ]
        };
    };
    return UtilsModule;
}());
export { UtilsModule };
UtilsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ControlInfoDirective
                ],
                exports: [
                    ControlInfoDirective
                ]
            },] },
];
/** @nocollapse */
UtilsModule.ctorParameters = function () { return [
    { type: UtilsModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    { type: UtilsGlobalConfig, decorators: [{ type: Optional },] },
]; };
//# sourceMappingURL=utils.module.js.map