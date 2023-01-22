import { Component, OnInit, OnDestroy } from '@angular/core';
import { Levels } from 'src/app/models/levels.model';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-machine-level',
  templateUrl: './machine-level.component.html',
  styleUrls: ['./machine-level.component.css']
})
export class MachineLevelComponent implements OnInit, OnDestroy {

  levels: Levels = {
    water: Levels.MAX_LEVEL,
    beans: Levels.MAX_LEVEL
  };
  submitted = false;
  id: null | ReturnType<typeof setTimeout> = null;

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit(): void {
    this.callMethod();
    this.id = setInterval(() => {
      this.callMethod();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  callMethod(){
    this.level();
  }

  getAsPercentage(value: number, max: number) {
    return Math.floor((value * Levels.MAX_LEVEL) / max);
  }

  level(): void {
    this.coffeeService.levels()
      .subscribe({
        next: (data) => {
          this.levels = {
            water: data.water,
            beans: data.beans
          };
        },
        error: (e) => console.error(e)
      });
    }
}
