import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscusionComponent } from './discusion.component';

describe('DiscusionComponent', () => {
  let component: DiscusionComponent;
  let fixture: ComponentFixture<DiscusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
