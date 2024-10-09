import {Directive, Host, Inject, SkipSelf, TemplateRef, ViewContainerRef} from '@angular/core';
import {LAYOUT_COMPONENTS_CONSUMER, LayoutComponentsConsumer, LayoutComponentType} from '../../interface';

@Directive({
    selector: '[rsUiPageSidebarContentRegistrar]',
    standalone: true,
})
export class SidebarContentRegistrarDirective {
    constructor(
        @Host() @SkipSelf() @Inject(LAYOUT_COMPONENTS_CONSUMER) protected parent: LayoutComponentsConsumer,
        protected viewContainer: ViewContainerRef,
        protected templateRef: TemplateRef<void>
    ) {
        this.parent.setComponent({
            id: Math.random().toString(),
            type: LayoutComponentType.sidebar,
            template: this.templateRef
        });
    }
}
