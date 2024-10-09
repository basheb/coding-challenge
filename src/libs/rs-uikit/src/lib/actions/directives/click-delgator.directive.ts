import {AfterViewInit, Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {fromEvent, Subscription, switchMap, timer} from 'rxjs';
import {tap} from 'rxjs/operators';

/**
 * The click delegator clicks on the child. This is useful in cases where a template is rendered in a parent
 * component but the actual click handler is on the template. If the parent has this directive it clicks on the rendered
 * template and therefore triggers the actual click listener. Otherwise, the event might be lost.
 */
@Directive({
    selector: '[rsUiClickDelegator]',
    standalone: true,
})
export class ClickDelgatorDirective<TItem> implements OnInit, AfterViewInit, OnDestroy {

    @Input()
    public disableDelegator: boolean;

    @Input()
    selector: string;

    @Input()
    delegateFn: () => void;

    @Input()
    canDelegate: (target: HTMLElement, clickEl: HTMLElement) => boolean;

    public disabled: boolean;
    private subscription: Subscription;

    constructor(
        @Host() @Optional() @SkipSelf() private parentDelegator: ClickDelgatorDirective<any>,
        private el: ElementRef<HTMLElement>
    ) {
    }

    ngOnInit(): void {
        this.subscription = fromEvent(this.el.nativeElement, 'click')
            .pipe(
                tap(() => this.setParentBlock(true)),
                tap((ev: MouseEvent) => this.delegateClick(ev)),
                switchMap(() => timer(1)),
                tap(() => this.setParentBlock(false))
            )
            .subscribe();
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private delegateClick(ev: MouseEvent): void {
        const target: HTMLElement = ev.target as HTMLElement;

        if (typeof this.delegateFn === 'function') {
            this.delegateFn();
            return;
        }

        const targetIsChild = target !== this.el.nativeElement && this.el.nativeElement.contains(target);
        if (this.disableDelegator || this.disabled || targetIsChild) {
            return;
        }

        // Return in case target is a button or a link
        if (target.closest('a') || target.closest('button')) {
            return;
        }

        let clickEl: HTMLElement;
        if (this.selector) {
            clickEl = this.el.nativeElement.querySelector(this.selector);
        } else {
            clickEl = this.el.nativeElement.querySelector('*');
        }

        const canDelegate = typeof this.canDelegate === 'function' ? this.canDelegate(target, clickEl) : true;

        if (clickEl && canDelegate) {
            ev.stopImmediatePropagation();
            clickEl.click();
        }
    }

    private setParentBlock(isBlocked: boolean): void {
        if (this.parentDelegator) {
            this.parentDelegator.disabled = isBlocked;
        }
    }
}
