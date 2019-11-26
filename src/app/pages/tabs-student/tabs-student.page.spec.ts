import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsStudentPage } from './tabs-student.page';

describe('TabsPage', () => {
  let component: TabsStudentPage;
  let fixture: ComponentFixture<TabsStudentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsStudentPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsStudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
