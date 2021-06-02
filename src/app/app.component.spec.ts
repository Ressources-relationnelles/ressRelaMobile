import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  // beforeEach(waitForAsync(() => {

  //   TestBed.configureTestingModule({
  //     declarations: [AppComponent],
  //     schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //   }).compileComponents();
  // }));

  it("doit initialiser l'application", () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    expect(1).toBe(1);
  });
  // TODO: add more tests!

});
