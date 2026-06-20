import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brew } from 'src/app/models/brew.model';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-brew-coffee',
  templateUrl: './brew-coffee.component.html',
  styleUrls: ['./brew-coffee.component.css']
})
export class BrewCoffeeComponent implements OnInit, OnDestroy {

  brew: Brew = new Brew();
  submitted = false;
  id: null | ReturnType<typeof setTimeout> = null;
  idLevels: null | ReturnType<typeof setTimeout> = null;
  //timeout: null | ReturnType<typeof setTimeout> = null;
  countdown = 0;
  running = false;
  machine_levels_empty = false;
  errorMessage = '';
  //constructor(private coffeeService: CoffeeService, private timeout: NodeJS.Timeout, private brew: Brew) {}
  constructor(private coffeeService: CoffeeService) {
    this.brew.cup_size = Brew.SIZE_GRANDE;
    this.brew.grain_size = Brew.DEFAULT_GRANULARITY;
    this.brew.delay = Brew.NO_DELAY;
  }

  ngOnInit(): void {
    this.callCheckLevels();
    this.idLevels = setInterval(() => {
      this.callCheckLevels();
    }, 2000);
  }

  ngOnDestroy() {
    this.closeInterval();
    if (this.idLevels) {
      clearInterval(this.idLevels);
    }
  }

  openInterval(ms: number): void {
    this.running = true;
    this.callMethod();
    this.id = setInterval(() => {
      this.callMethod();
    }, ms);
  }

  closeInterval() {
    if (this.id) {
      clearInterval(this.id);
    }
    this.running = false;
    this.brew.delay = 0;
  }

  callCheckLevels(){
    this.level();
  }

  level(): void {
    this.coffeeService.levels()
      .subscribe({
        next: (data) => {
          this.machine_levels_empty = !data.water || !data.beans;
        },
        error: (e) => console.error(e)
      });
    }

  callMethod(){
    this.countdown = this.countdown - 1;
    this.brew.delay = this.countdown;
    if(this.countdown <= 0) {
      this.closeInterval();
      this.brewit();
    }
  }

  changeSize(val: any)
  {
    this.brew.cup_size = val;
  }

  checked_brewit(): void {
    this.errorMessage = '';
    this.submitted = false;
    this.countdown = this.brew.delay || 0;
    if (this.countdown > 0) {
      this.openInterval(1000);
    } else {
      this.running = true;
      this.brewit();
    }
  }

  brewit(): void {
    this.running = true;
    const savedDelay = this.brew.delay ?? 0;
    this.coffeeService.brew(this.brew.cup_size, this.brew.grain_size, savedDelay)
      .subscribe({
        next: () => {
          this.submitted = true;
          this.errorMessage = '';
          this.callCheckLevels();
          setTimeout(() => { this.running = false; }, savedDelay > 0 ? 800 : 1800);
          setTimeout(() => { this.submitted = false; }, 4000);
        },
        error: (e) => {
          this.running = false;
          this.errorMessage = e?.message ?? 'Could not brew — refill water and beans.';
          this.callCheckLevels();
        }
      });
  }
}
