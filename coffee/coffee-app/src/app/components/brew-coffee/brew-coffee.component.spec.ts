import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewCoffeeComponent } from './brew-coffee.component';

describe('BrewCoffeeComponent', () => {
  let component: BrewCoffeeComponent;
  let fixture: ComponentFixture<BrewCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
