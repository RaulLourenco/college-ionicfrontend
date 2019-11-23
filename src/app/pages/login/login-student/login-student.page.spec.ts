import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStudentPage } from './login-student.page';

describe('LoginStudentPage', () => {
  let component: LoginStudentPage;
  let fixture: ComponentFixture<LoginStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStudentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
