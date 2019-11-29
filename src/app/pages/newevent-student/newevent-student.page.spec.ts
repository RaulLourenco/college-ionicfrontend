import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweventStudentPage } from './newevent-student.page';

describe('NeweventStudentPage', () => {
  let component: NeweventStudentPage;
  let fixture: ComponentFixture<NeweventStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeweventStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweventStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
