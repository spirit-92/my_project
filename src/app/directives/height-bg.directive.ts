import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeightBg]'
})
export class HeightBgDirective {
 scroll:number;
  constructor(
    private element: ElementRef
  ) {
    this.scroll = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    this.element.nativeElement.style.height =`${this.scroll}px`;

  }

}
