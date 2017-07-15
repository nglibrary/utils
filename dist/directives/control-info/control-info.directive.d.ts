import { ElementRef, OnDestroy, OnInit, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UtilsGlobalConfig } from '../../utils.config';
export declare class ControlInfoDirective implements OnInit, OnDestroy {
    private currElRef;
    private renderer;
    private formControl;
    private utilsConfig;
    controlInfo: any;
    value: any;
    targetEl: any;
    subscription: Subscription;
    targetElClasses: any;
    globalConfig: any;
    allClasses: any[];
    onfocus: boolean;
    errors: string[];
    config: {
        selector: any;
        prefix: string;
        class: {
            valid: string;
            invalid: string;
            pristine: string;
            dirty: string;
            touched: string;
            unTouched: string;
            hasErrors: string;
            noErrors: string;
            disabled: string;
            enabled: string;
            hasValue: string;
            noValue: string;
            onFocus: string;
        };
    };
    constructor(currElRef: ElementRef, renderer: Renderer, formControl: NgControl, utilsConfig: UtilsGlobalConfig);
    ngOnInit(): void;
    ngOnDestroy(): void;
    getClasses(classes: string[]): string[];
    focus(): void;
    blur(): void;
    private closest(matchesSelector, el, selector);
    private match(el, selector);
    private check();
}
