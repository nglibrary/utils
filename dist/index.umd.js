/**
 * @nglibrary/utils - Utility library for Angular 4+
 * @version v1.0.0
 * @author Lokesh Rajendran
 * @link https://github.com/nglibrary/utils#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["ticktock"] = factory(require("@angular/core"), require("@angular/forms"));
	else
		root["ticktock"] = factory(root["ng"]["core"], root["ng"]["forms"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var forms_1 = __webpack_require__(6);
var utils_config_1 = __webpack_require__(1);
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
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ControlInfoDirective.prototype, "controlInfo", void 0);
__decorate([
    core_1.HostListener('focus', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControlInfoDirective.prototype, "focus", null);
__decorate([
    core_1.HostListener('blur', []),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControlInfoDirective.prototype, "blur", null);
ControlInfoDirective = __decorate([
    core_1.Directive({
        selector: '[controlInfo]'
    }),
    __param(3, core_1.Optional()),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        forms_1.NgControl,
        utils_config_1.UtilsGlobalConfig])
], ControlInfoDirective);
exports.ControlInfoDirective = ControlInfoDirective;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UtilsGlobalConfig = (function () {
    function UtilsGlobalConfig() {
    }
    return UtilsGlobalConfig;
}());
exports.UtilsGlobalConfig = UtilsGlobalConfig;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var control_info_directive_1 = __webpack_require__(0);
exports.ControlInfoDirective = control_info_directive_1.ControlInfoDirective;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(2);
var control_info_directive_1 = __webpack_require__(0);
var utils_config_1 = __webpack_require__(1);
var UtilsModule = UtilsModule_1 = (function () {
    function UtilsModule(parentModule, config) {
        this.config = config || [];
        if (parentModule) {
            throw new Error('UtilsModule is already loaded. Import it in the AppModule only');
        }
        console.log('config', config);
    }
    UtilsModule.forRoot = function (config) {
        return {
            ngModule: UtilsModule_1,
            providers: [
                { provide: utils_config_1.UtilsGlobalConfig, useValue: config }
            ]
        };
    };
    return UtilsModule;
}());
UtilsModule = UtilsModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            control_info_directive_1.ControlInfoDirective
        ],
        exports: [
            control_info_directive_1.ControlInfoDirective
        ]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.SkipSelf()),
    __param(1, core_1.Optional()),
    __metadata("design:paramtypes", [UtilsModule,
        utils_config_1.UtilsGlobalConfig])
], UtilsModule);
exports.UtilsModule = UtilsModule;
var UtilsModule_1;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var directives_1 = __webpack_require__(3);
exports.ControlInfoDirective = directives_1.ControlInfoDirective;
var utils_module_1 = __webpack_require__(4);
exports.UtilsModule = utils_module_1.UtilsModule;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map