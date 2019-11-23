import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProfessorPage } from './login-professor.page';

describe('LoginProfessorPage', () => {
  let component: LoginProfessorPage;
  let fixture: ComponentFixture<LoginProfessorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginProfessorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginProfessorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
