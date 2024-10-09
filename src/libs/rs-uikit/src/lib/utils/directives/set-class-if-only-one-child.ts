import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
    selector: '[rsUiSetClassIfOnlyOneChild]',
    standalone: true
})
export class SetClassIfOnlyOneChildDirective implements AfterViewInit {
    @Input({required: true})
    public className: string;

    @Input()
    public selector = '*';

    constructor(
        private el: ElementRef<HTMLElement>
    ) {
    }

    ngAfterViewInit(): void {
        const childEl = this.el.nativeElement.querySelector(this.selector);
        if (childEl && (!childEl.nextSibling || childEl.nextSibling instanceof Comment)) {
            this.el.nativeElement.classList.add(this.className);
        }
    }
}
