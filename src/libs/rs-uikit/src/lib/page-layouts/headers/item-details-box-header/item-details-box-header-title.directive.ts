import {Directive, Host, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import {ItemDetailsBoxHeaderComponent} from './item-details-box-header.component';

@Directive({
    selector: '[rsUiItemDetailsBoxHeaderTitle]',
    standalone: true,
})
export class ItemDetailsBoxHeaderTitleDirective {
    constructor(
        @Host() @SkipSelf() protected parent: ItemDetailsBoxHeaderComponent,
        protected viewContainer: ViewContainerRef,
        protected templateRef: TemplateRef<void>
    ) {
        this.parent.titleTmpl = this.templateRef;
    }
}
