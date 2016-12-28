/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QAModalComponent } from './q-a-modal.component';

describe('QAModalComponent', () => {
  let component: QAModalComponent;
  let fixture: ComponentFixture<QAModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
