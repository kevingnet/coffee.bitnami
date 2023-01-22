import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefillMachineComponent } from './refill-machine.component';

describe('RefillMachineComponent', () => {
  let component: RefillMachineComponent;
  let fixture: ComponentFixture<RefillMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefillMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefillMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
