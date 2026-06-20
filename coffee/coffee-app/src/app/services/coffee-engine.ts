/** In-browser coffee machine state (used on GitHub Pages; mirrors server.js). */
export class CoffeeEngine {
  static readonly MAX_WATER = 480;
  static readonly MAX_BEANS = 240;
  static readonly WATER_FACTOR = 4;
  static readonly GRAIN_FACTOR = 1;

  water = CoffeeEngine.MAX_WATER;
  beans = CoffeeEngine.MAX_BEANS;

  levels(): { water: number; beans: number } {
    return {
      water: Math.floor((100 * this.water) / CoffeeEngine.MAX_WATER),
      beans: Math.floor((100 * this.beans) / CoffeeEngine.MAX_BEANS),
    };
  }

  refill(water?: number, beans?: number): { water: number; beans: number } {
    this.water = water ?? CoffeeEngine.MAX_WATER;
    this.beans = beans ?? CoffeeEngine.MAX_BEANS;
    return { water: this.water, beans: this.beans };
  }

  brew(cup_size: number, _grain_size: number, _delay: number): { water: number; beans: number } {
    const sz = parseInt(String(cup_size), 10);
    this.water -= CoffeeEngine.WATER_FACTOR * sz;
    this.beans -= CoffeeEngine.GRAIN_FACTOR * sz;
    if (this.water < 0) {
      this.water = 0;
      throw new Error('Not enough water — refill the machine.');
    }
    if (this.beans < 0) {
      this.beans = 0;
      throw new Error('Not enough beans — refill the machine.');
    }
    return { water: this.water, beans: this.beans };
  }
}
