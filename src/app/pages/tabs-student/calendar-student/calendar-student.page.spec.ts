import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarStudentPage } from './calendar-student.page';

describe('CalendarStudentPage', () => {
  let component: CalendarStudentPage;
  let fixture: ComponentFixture<CalendarStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
