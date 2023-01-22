import { Component, OnInit } from '@angular/core';
import { Machine } from 'src/app/models/machine.model';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-refill-machine',
  templateUrl: './refill-machine.component.html',
  styleUrls: ['./refill-machine.component.css']
})
export class RefillMachineComponent implements OnInit {

  machine: Machine = {
    water: Machine.MAX_WATER,
    beans: Machine.MAX_BEANS
  };
  submitted = false;

  constructor(private coffeeService: CoffeeService) { }

  ngOnInit(): void {
  }

  refill(): void {
    this.coffeeService.refill(this.machine.water, this.machine.beans)
      .subscribe({
        next: (data) => {
          this.submitted = true;
          this.machine = {
            water: data.water,
            beans: data.beans
          };
        },
        error: (e) => console.error(e)
      });
  }
}
