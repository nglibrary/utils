import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
  } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NGValidators } from 'ng-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ph: TemplateRef<any>;
  reactiveForm: FormGroup;
  constructor(
    public sanitize: DomSanitizer,
    public fb: FormBuilder
  ) { }
  ngOnInit() {
    this.reactiveForm = this.fb.group({
      email: ['', [Validators.required, NGValidators.isEmail()]]
    });
  }
  tags(longString) {
    const html = longString.split(' ').map(a => `<span class="label label-primary ${a}">.${a}</span>`).join('');
    return this.sanitize.bypassSecurityTrustHtml(html);
  }
}
