import { ElementRef, Injectable } from '@angular/core';

const TOP_APP_TOOLBAR_OFFSET = 70;

@Injectable()
export class ScrollService {
  constructor() {}

  scrollToElementIfOffscreen(element: ElementRef) {
    const { top } = element.nativeElement.getBoundingClientRect();
    if (top < TOP_APP_TOOLBAR_OFFSET || top > window.innerHeight) {
      element.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    }
  }
}
