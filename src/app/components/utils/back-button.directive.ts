import { Directive, ElementRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[backButton]',
  standalone: true
})
export class BackButtonDirective {
  constructor(private location: Location, private el: ElementRef) {
  }
  @HostListener('click') onClick() {
    this.location.back();
  }
}
