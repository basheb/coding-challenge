import {Directive, Host, OnDestroy, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import {OverviewPageComponent} from './overview-page.component';

@Directive({
    selector: '[rsOverViewPageTitleAddOn]'
})
export class OverviewPageTitleAddOnDirective implements OnDestroy {

    constructor(@Host() @SkipSelf() private parent: OverviewPageComponent,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<unknown>) {
        this.parent.titleAddOn = this.templateRef;
    }

    ngOnDestroy(): void {
        this.parent.titleAddOn = undefined;
    }
}
