import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input('appHighlight')
  filterWords!: string[]; // Words to be highlighted

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['filterWords']) {
  //     this.highlight();
  //   }
  // }
  ngOnChanges(): void {
    this.highlightText();
  }
  private highlight(): void {
    if (!this.filterWords || !this.filterWords.length) {
      // If no filter words are provided, display the text normally.
      return;
    }

    let content = this.el.nativeElement.textContent;
    this.filterWords.forEach(word => {
      // Use a RegExp to create a case-insensitive search pattern.
      const pattern = new RegExp(`(${word})`, 'gi');
      content = content.replace(pattern, `<span class="highlight">$1</span>`);
    });

    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', content);
  }
  private highlightText(): void {
    let content = this.el.nativeElement.innerText || '';
    if (this.filterWords && this.filterWords.length > 0) {
      this.filterWords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        content = content.replace(regex, `<span class="highlight">$1</span>`);
      });
    }
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', content);
  }
}
