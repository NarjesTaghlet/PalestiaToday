import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomDirective]'
})
export class CustomDirective{
  @Input() appCustomDirective: string | undefined; 

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.changeBackgroundColor(this.appCustomDirective || 'lightgray'); 
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackgroundColor(null);
  }
  private changeBackgroundColor(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
