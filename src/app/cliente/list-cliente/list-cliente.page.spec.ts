import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientePage } from './list-cliente.page';

describe('ListClientePage', () => {
  let component: ListClientePage;
  let fixture: ComponentFixture<ListClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
