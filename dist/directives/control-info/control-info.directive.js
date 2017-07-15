var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Directive, ElementRef, HostListener, Input, Optional, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UtilsGlobalConfig } from '../../utils.config';
var ControlInfoDirective = (function () {
    function ControlInfoDirective(currElRef, renderer, formControl, utilsConfig) {
        this.currElRef = currElRef;
        this.renderer = renderer;
        this.formControl = formControl;
        this.utilsConfig = utilsConfig;
        this.allClasses = [];
        this.errors = [];
        this.config = {
            selector: null,
            prefix: 'info',
            class: {
                valid: 'valid',
                invalid: 'invalid',
                pristine: 'pristine',
                dirty: 'dirty',
                touched: 'touched',
                unTouched: 'untouched',
                hasErrors: 'has-errors',
                noErrors: 'no-errors',
                disabled: 'disabled',
                enabled: 'enabled',
                hasValue: 'has-value',
                noValue: 'no-value',
                onFocus: 'on-focus'
            }
        };
    }
    ControlInfoDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this.utilsConfig && this.utilsConfig.controlInfo) {
            this.globalConfig = this.utilsConfig.controlInfo;
        }
        this.config = __assign({}, this.config, this.globalConfig, this.controlInfo);
        if (typeof this.config.selector === 'string') {
            try {
                this.targetEl = this.match(this.currElRef.nativeElement, this.config.selector);
            }
            catch (er) {
                throw new Error('Invalid selector');
            }
            this.targetElClasses = this.targetEl.className.split(' ');
        }
        else if (typeof this.config.selector === 'object' && this.config.selector instanceof Node) {
            this.targetEl = this.config.selector;
            this.targetElClasses = this.targetEl.className.split(' ');
        }
        else {
            throw new Error('Invalid selector');
        }
        this.subscription = this.formControl.valueChanges.subscribe(function (value) {
            if (_this.formControl.errors != null) {
                _this.errors = Object
                    .keys(_this.formControl.errors)
                    .map(function (a) { return [_this.config.prefix, 'error', a].join('-'); });
            }
            else {
                _this.errors = [];
            }
            _this.check();
        });
        this.check();
    };
    ControlInfoDirective.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ControlInfoDirective.prototype.getClasses = function (classes) {
        var _this = this;
        return classes.map(function (x) { return [_this.config.prefix, _this.config.class[x]].join('-'); });
    };
    ControlInfoDirective.prototype.focus = function () {
        this.onfocus = true;
        this.check();
    };
    ControlInfoDirective.prototype.blur = function () {
        this.onfocus = false;
        this.check();
    };
    ControlInfoDirective.prototype.closest = function (matchesSelector, el, selector) {
        return !el ? null :
            matchesSelector.call(el, selector)
                ? el
                : this.closest(matchesSelector, el.parentElement, selector);
    };
    ControlInfoDirective.prototype.match = function (el, selector) {
        var matchesSelector = el.matches
            || el.webkitMatchesSelector
            || el.mozMatchesSelector
            || el.msMatchesSelector;
        return !el
            ? null
            : matchesSelector.call(el, selector)
                ? el
                : this.closest(matchesSelector, el.parentElement, selector);
    };
    ControlInfoDirective.prototype.check = function () {
        var control = this.formControl;
        var data = [
            control.valid ? 'valid' : 'invalid',
            control.touched ? 'touched' : 'unTouched',
            control.pristine ? 'pristine' : 'dirty',
            control.disabled ? 'disabled' : 'enabled',
            control.errors ? 'hasErrors' : 'noErrors',
            control.value ? 'hasValue' : 'noValue'
        ];
        if (this.onfocus) {
            data.push('onFocus');
        }
        data = this.getClasses(data).concat(this.errors);
        this.targetEl.className = this.targetElClasses;
        (_a = this.targetEl.classList).add.apply(_a, data);
        var _a;
    };
    return ControlInfoDirective;
}());
export { ControlInfoDirective };
ControlInfoDirective.decorators = [
    { type: Directive, args: [{
                selector: '[controlInfo]'
            },] },
];
/** @nocollapse */
ControlInfoDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgControl, },
    { type: UtilsGlobalConfig, decorators: [{ type: Optional },] },
]; };
ControlInfoDirective.propDecorators = {
    'controlInfo': [{ type: Input },],
    'focus': [{ type: HostListener, args: ['focus', [],] },],
    'blur': [{ type: HostListener, args: ['blur', [],] },],
};
//# sourceMappingURL=control-info.directive.js.map