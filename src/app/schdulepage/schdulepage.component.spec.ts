import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchdulepageComponent } from './schdulepage.component';

describe('SchdulepageComponent', () => {
  let component: SchdulepageComponent;
  let fixture: ComponentFixture<SchdulepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchdulepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchdulepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
