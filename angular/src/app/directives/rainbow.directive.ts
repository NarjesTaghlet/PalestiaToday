import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
})
export class RainbowDirective {
  // @HostBinding('style.color') color = 'red';
  // @HostBinding('style.borderColor') bc = 'red';
  private colorPalette: string[] = [
    '#23261A', // dark jungle green
    '#283618', // dark olive green
    '#606C38', // olive drab
    '#3E442B', // dark moss green
    '#1F271B', // black olive
    '#335C67', // greenish teal
    '#2F3061', // dark imperial blue with a green tint
    '#5A4C0C', // dark beige
    '#8C1918', // dark red
    '#692525', // burgundy
    '#9B1B30', // up maroon
    '#771D32', // dark sienna
    '#AF2B1E', // firebrick
    '#A43820', // red ochre
    '#7C0A02', // barn red
    '#131212', // eerie black
  ];

  @HostBinding('style.color') color: string = this.colorPalette[0];
  @HostBinding('style.borderColor') borderColor: string = this.colorPalette[0];

  constructor() {}
  // @HostListener('keyup') onKeyUp() {
  //   this.bc = this.color = this.getRandomColor();
  // }

  @HostListener('keyup') onKeyUp() {
    const randomIndex = Math.floor(Math.random() * this.colorPalette.length);
    this.color = this.borderColor = this.colorPalette[randomIndex];
  }
}
