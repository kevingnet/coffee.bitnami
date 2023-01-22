export class Brew {
  id?: any;
  cup_size?: number;
  grain_size?: number;
  delay?: number;

  static MAX_DELAY = 60; //60 seconds
  static SIZE_TALL = 4;
  static SIZE_GRANDE = 5;
  static SIZE_VENTI = 6;

  static GRAIN_FACTOR = 1;
  static WATER_FACTOR = 4;
  static NO_DELAY = 0;
  static DEFAULT_GRANULARITY = 5;
}
