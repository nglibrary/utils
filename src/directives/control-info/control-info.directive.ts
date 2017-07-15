import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer
  } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UtilsGlobalConfig } from '../../utils.config';

@Directive({
  selector: '[controlInfo]'
})
export class ControlInfoDirective implements OnInit, OnDestroy {
  @Input() controlInfo: any;
  value: any;
  targetEl: any;
  subscription: Subscription;
  targetElClasses: any;
  globalConfig: any;
  allClasses: any[] = [];
  onfocus: boolean;
  errors: string[] = [];
  config = {
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

  constructor(
    private currElRef: ElementRef,
    private renderer: Renderer,
    private formControl: NgControl,
    @Optional() private utilsConfig: UtilsGlobalConfig
  ) { }

  ngOnInit(): void {
    if (this.utilsConfig && this.utilsConfig.controlInfo) {
      this.globalConfig = this.utilsConfig.controlInfo;
    }
    this.config = { ...this.config, ...this.globalConfig, ...this.controlInfo };
    if (typeof this.config.selector === 'string') {
      try {
        this.targetEl = this.match(this.currElRef.nativeElement, this.config.selector);
      } catch (er) {
        throw new Error('Invalid selector');
      }
      this.targetElClasses = this.targetEl.className.split(' ');
    } else if (typeof this.config.selector === 'object' && this.config.selector instanceof Node) {
      this.targetEl = this.config.selector;
      this.targetElClasses = this.targetEl.className.split(' ');
    } else {
      throw new Error('Invalid selector');
    }
    this.subscription = this.formControl.valueChanges.subscribe((value: any) => {
      if (this.formControl.errors != null) {
        this.errors = Object
          .keys(this.formControl.errors)
          .map((a: string) => [this.config.prefix, 'error', a].join('-'));
      } else {
        this.errors = [];
      }
      this.check();
    });
    this.check();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getClasses(classes: string[]): string[] {
    return classes.map((x: any) => [this.config.prefix, this.config.class[x]].join('-'));
  }

  @HostListener('focus', [])
  focus(): void {
    this.onfocus = true;
    this.check();
  }
  @HostListener('blur', [])
  blur(): void {
    this.onfocus = false;
    this.check();
  }

  private closest(matchesSelector: any, el: HTMLElement, selector: string): any {
    return !el ? null :
      matchesSelector.call(el, selector)
        ? el
        : this.closest(matchesSelector, el.parentElement, selector);
  }

  private match(el: any, selector: string): any {
    const matchesSelector = el.matches
      || el.webkitMatchesSelector
      || el.mozMatchesSelector
      || el.msMatchesSelector;
    return !el
      ? null
      : matchesSelector.call(el, selector)
        ? el
        : this.closest(matchesSelector, el.parentElement, selector);
  }

  private check(): void {
    const control = this.formControl;
    let data = [
      control.valid ? 'valid' : 'invalid',
      control.touched ? 'touched' : 'unTouched',
      control.pristine ? 'pristine' : 'dirty',
      control.disabled ? 'disabled' : 'enabled',
      control.errors ? 'hasErrors' : 'noErrors',
      control.value ? 'hasValue' : 'noValue'
    ];
    if (this.onfocus) { data.push('onFocus'); }
    data = this.getClasses(data).concat(this.errors);
    this.targetEl.className = this.targetElClasses;
    this.targetEl.classList.add(...data);
  }
}
