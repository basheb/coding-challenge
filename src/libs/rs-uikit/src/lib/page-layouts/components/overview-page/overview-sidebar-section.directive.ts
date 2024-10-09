import {Directive, Host, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import {OverviewPageComponent} from './overview-page.component';
import {ItemAction, ItemActionStringType, ItemActionType} from '../../item-actions/interface';

@Directive({
    selector: '[rsOverViewSidebarSection]'
})
export class OverviewPageSidebarSectionDirective implements OnDestroy {
    constructor(@Host() @SkipSelf() private parent: OverviewPageComponent,
                private viewContainer: ViewContainerRef,
                private templateRef: TemplateRef<unknown>) {
        this.parent.sidebarSectionTemplates.push(templateRef);
    }

    ngOnDestroy(): void {
        this.parent.sidebarSectionTemplates.splice(
            this.parent.sidebarSectionTemplates.indexOf(this.templateRef),
            1
        );
    }
}
