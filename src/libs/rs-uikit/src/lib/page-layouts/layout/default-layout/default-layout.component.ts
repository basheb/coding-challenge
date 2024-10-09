import { Component, forwardRef, TemplateRef } from '@angular/core';
import {
    LAYOUT_COMPONENTS_CONSUMER,
    LayoutComponent,
    LayoutComponentsConsumer,
    LayoutComponentType
} from '../../interface';
import {NgIf, NgTemplateOutlet} from '@angular/common';

export const layoutComponentsConsumer: any = {
    provide: LAYOUT_COMPONENTS_CONSUMER,
    useExisting: forwardRef(() => DefaultLayoutComponent)
};


@Component({
    selector: 'rs-ui-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss'],
    providers: [layoutComponentsConsumer],
    standalone: true,
    imports: [
        NgIf,
        NgTemplateOutlet
    ]
})
export class DefaultLayoutComponent implements LayoutComponentsConsumer {
    protected templates: Map<LayoutComponentType, TemplateRef<void>> = new Map();
    protected LayoutComponentType: typeof LayoutComponentType = LayoutComponentType;

    removeComponent(layoutComponent: LayoutComponent): void {
    }

    setComponent(layoutComponent: LayoutComponent): void {
        this.templates.set(layoutComponent.type as LayoutComponentType, layoutComponent.template);
    }

}
