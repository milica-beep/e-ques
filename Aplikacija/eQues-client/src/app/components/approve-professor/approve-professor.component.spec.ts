import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProfessorComponent } from './approve-professor.component';

describe('ApproveProfessorComponent', () => {
  let component: ApproveProfessorComponent;
  let fixture: ComponentFixture<ApproveProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
