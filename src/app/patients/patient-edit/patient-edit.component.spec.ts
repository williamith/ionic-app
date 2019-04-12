import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditComponent } from './patient-edit.component';

describe('PatientEditComponent', () => {
  let component: PatientEditComponent;
  let fixture: ComponentFixture<PatientEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientEditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
