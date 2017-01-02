/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QASessionComponent } from './qasession.component';

describe('QASessionComponent', () => {
  let component: QASessionComponent;
  let fixture: ComponentFixture<QASessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QASessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QASessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
