import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistsPage } from './pharmacists.page';

describe('PharmacistsPage', () => {
  let component: PharmacistsPage;
  let fixture: ComponentFixture<PharmacistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
