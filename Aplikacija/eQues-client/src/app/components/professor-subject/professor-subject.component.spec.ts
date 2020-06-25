import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSubjectComponent } from './professor-subject.component';

describe('ProfessorSubjectComponent', () => {
  let component: ProfessorSubjectComponent;
  let fixture: ComponentFixture<ProfessorSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
