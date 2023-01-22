import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrewCoffeeComponent } from './components/brew-coffee/brew-coffee.component';
import { MachineLevelComponent } from './components/machine-level/machine-level.component';
import { RefillMachineComponent } from './components/refill-machine/refill-machine.component';

const routes: Routes = [
  { path: '', redirectTo: 'brew', pathMatch: 'full' },
  { path: 'level', component: MachineLevelComponent },
  { path: 'brew', component: BrewCoffeeComponent },
  { path: 'refill', component: RefillMachineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
