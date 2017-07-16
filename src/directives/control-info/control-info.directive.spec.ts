import { Component, DebugElement, OnInit } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
  } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
  } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UtilsModule } from '../../utils.module';
import { ControlInfoDirective } from './control-info.directive';

@Component({
  template: `
    <div class="container reactive-form">
      <form [formGroup]="reactiveForm">
        <div class="form-group name-group">
          <label for="name">Name</label>
          <div class="input-group">
            <input type="name"
              placeholder="username"
              class="form-control name"
              formControlName="name"
              [controlInfo]="{selector:'.name-group'}">
          </div>
        </div>
        <div class="form-group email-group" #target>
          <label for="name">Email</label>
          <div class="input-group">
            <input type="text"
              placeholder="abc@xyz.com"
              class="form-control email"
              formControlName="email"
              [controlInfo]="{selector:target}">
          </div>
        </div>
        <div class="form-group phone-group">
          <label for="name">Phone</label>
          <div class="input-group">
            <input type="number"
              placeholder="12345678"
              class="form-control phone"
              formControlName="phone"
              [controlInfo]="{selector:'.input-group',prefix:'xyz'}">
          </div>
        </div>
        <div class="form-group address-group" *ngIf="showInvalidGroup">
          <label for="name">Address</label>
          <div class="input-group">
            <input type="test"
              placeholder="24 ave"
              class="form-control address"
              formControlName="address"
              [controlInfo]="{selector:invalidSelector}">
          </div>
        </div>
      </form>
    </div>
  `
})
class TestControlInfoComponent implements OnInit {
  reactiveForm: FormGroup;
  showInvalidGroup = true;
  invalidSelector: any = '@WT#@#@#';
  constructor(
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.reactiveForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', Validators.pattern(`/123[0-9]+/`)],
      address: ['']
    });
  }
}

describe('ControlInfoDirective', () => {
  let component: TestControlInfoComponent;
  let fixture: ComponentFixture<TestControlInfoComponent>;
  let rfNameEl: DebugElement;
  let rfNameTgEl: DebugElement;
  let rfEmailEl: DebugElement;
  let rfEmailTgEl: DebugElement;
  let rfPhoneEl: DebugElement;
  let rfPhoneTgEl: DebugElement;
  let rfAdrEl: DebugElement;

  describe('With global config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          UtilsModule.forRoot({
            controlInfo: {
              prefix: 'abc'
            }
          })
        ],
        declarations: [
          TestControlInfoComponent
        ]
      }).compileComponents().then(() => {/* empty */ });
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestControlInfoComponent);
      component = fixture.componentInstance;

      rfNameEl = fixture.debugElement
        .query(By.css('.reactive-form .name'));
      rfNameTgEl = fixture.debugElement
        .query(By.css('.reactive-form .name-group'));

      component.showInvalidGroup = false;
    });

    describe('On reactive form control', () => {
      it('should load prefix from global config', () => {
        fixture.detectChanges();
        expect(rfNameTgEl.nativeElement.className).toContain('abc-untouched');
      });
    });
  });
  describe('With local config', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule
        ],
        declarations: [
          TestControlInfoComponent,
          ControlInfoDirective
        ]
      }).compileComponents().then(() => { /* empty */ });
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestControlInfoComponent);
      component = fixture.componentInstance;

      rfNameEl = fixture.debugElement
        .query(By.css('.reactive-form .name'));
      rfNameTgEl = fixture.debugElement
        .query(By.css('.reactive-form .name-group'));

      rfEmailEl = fixture.debugElement
        .query(By.css('.reactive-form .email'));
      rfEmailTgEl = fixture.debugElement
        .query(By.css('.reactive-form .email-group'));

      rfPhoneEl = fixture.debugElement
        .query(By.css('.reactive-form .phone'));
      rfPhoneTgEl = fixture.debugElement
        .query(By.css('.reactive-form .phone-group .input-group'));

      rfAdrEl = fixture.debugElement
        .query(By.css('.reactive-form .address'));

      component.showInvalidGroup = false;
    });

    describe('On reactive form control', () => {
      it('should add classes on load', () => {
        fixture.detectChanges();
        expect(rfNameTgEl.nativeElement.className).toContain('info-untouched');
        expect(rfEmailTgEl.nativeElement.className).toContain('email-group');
      });
      it('should add classes on click', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        rfNameEl.nativeElement.dispatchEvent(new Event('click'));
        tick();
        expect(rfNameTgEl.nativeElement.className).toContain('info-has-errors');
      }));
      it('should add classes on focus', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        rfNameEl.nativeElement.dispatchEvent(new Event('focus'));
        tick();
        expect(rfNameTgEl.nativeElement.className).toContain('info-on-focus');
        tick();
        rfNameEl.nativeElement.dispatchEvent(new Event('blur'));
        fixture.detectChanges();
        tick();
        expect(rfNameTgEl.nativeElement.className).not.toContain('info-on-focus');
      }));
      it('should add error classes on null input', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        rfNameEl.nativeElement.value = null;
        rfNameEl.nativeElement.dispatchEvent(new Event('input'));
        tick();
        expect(rfNameTgEl.nativeElement.className).toContain('info-no-value');
        expect(rfNameTgEl.nativeElement.className).toContain('info-has-error');
        expect(rfNameTgEl.nativeElement.className).toContain('info-error-required');
        expect(rfNameTgEl.nativeElement.className).toContain('info-invalid');
        expect(rfNameTgEl.nativeElement.className).toContain('info-untouched');
        expect(rfNameTgEl.nativeElement.className).toContain('info-dirty');
      }));
      it('should change classes on invalid email', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        rfEmailEl.nativeElement.value = 'foobar';
        rfEmailEl.nativeElement.dispatchEvent(new Event('input'));
        tick();
        expect(rfEmailTgEl.nativeElement.className).toContain('info-has-value');
        expect(rfEmailTgEl.nativeElement.className).toContain('info-has-error');
        expect(rfEmailTgEl.nativeElement.className).toContain('info-error-email');
        expect(rfEmailTgEl.nativeElement.className).toContain('info-invalid');
        expect(rfEmailTgEl.nativeElement.className).toContain('info-untouched');
        expect(rfEmailTgEl.nativeElement.className).toContain('info-dirty');
        expect(rfEmailTgEl.nativeElement.className).not.toContain('info-no-error');
        expect(rfEmailTgEl.nativeElement.className).not.toContain('info-valid');
        expect(rfEmailTgEl.nativeElement.className).not.toContain('info-error-required');
      }));
      it('should change classes on valid name', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        rfNameEl.nativeElement.value = 'foobar';
        rfNameEl.nativeElement.dispatchEvent(new Event('input'));
        tick();
        expect(rfNameTgEl.nativeElement.className).toContain('info-has-value');
        expect(rfNameTgEl.nativeElement.className).toContain('info-untouched');
        expect(rfNameTgEl.nativeElement.className).toContain('info-dirty');
        expect(rfNameTgEl.nativeElement.className).toContain('info-no-error');
      }));
      it('should have custom prefix', fakeAsync(() => {
        fixture.detectChanges();
        tick();
        rfPhoneEl.nativeElement.value = 2221234567;
        rfPhoneEl.nativeElement.dispatchEvent(new Event('input'));
        tick();
        expect(rfPhoneTgEl.nativeElement.className).toContain('xyz-has-value');
        expect(rfPhoneTgEl.nativeElement.className).toContain('xyz-has-error');
        expect(rfPhoneTgEl.nativeElement.className).toContain('xyz-error-pattern');
        expect(rfPhoneTgEl.nativeElement.className).toContain('xyz-untouched');
        expect(rfPhoneTgEl.nativeElement.className).toContain('xyz-dirty');
      }));
      it('should throw exception on invalid selector', fakeAsync(() => {
        expect(() => {
          component.showInvalidGroup = true;
          fixture.detectChanges();
        }).toThrowError('Invalid selector');
      }));
      it('should throw exception on numeric selector', fakeAsync(() => {
        expect(() => {
          component.invalidSelector = 12345678;
          component.showInvalidGroup = true;
          fixture.detectChanges();
        }).toThrowError('Invalid selector');
      }));
    });
  });

  describe('On template form control', () => {
    // todo
  });
});
