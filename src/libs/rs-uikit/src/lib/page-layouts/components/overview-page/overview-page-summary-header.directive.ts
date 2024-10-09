import { Directive, Host, OnDestroy, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { OverviewPageComponent } from './overview-page.component';

@Directive({
    selector: '[rsOverViewPageSummaryHeader]'
})
export class OverviewPageSummaryHeaderDirective implements OnDestroy {

    constructor(@Host() @SkipSelf() private parent: OverviewPageComponent,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<unknown>) {
        this.parent.summaryHeader = this.templateRef;
    }

    ngOnDestroy(): void {
        this.parent.summaryHeader = undefined;
    }
}
