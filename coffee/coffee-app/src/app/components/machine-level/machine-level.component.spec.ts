import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineLevelComponent } from './machine-level.component';

describe('MachineLevelComponent', () => {
  let component: MachineLevelComponent;
  let fixture: ComponentFixture<MachineLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
