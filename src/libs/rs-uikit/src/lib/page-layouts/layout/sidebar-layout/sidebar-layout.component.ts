import { Component, forwardRef, TemplateRef } from '@angular/core';
import {
    LAYOUT_COMPONENTS_CONSUMER,
    LayoutComponent,
    LayoutComponentsConsumer,
    LayoutComponentType
} from '../../interface';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {NzContentComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';

const layoutComponentsConsumer: any = {
    provide: LAYOUT_COMPONENTS_CONSUMER,
    useExisting: forwardRef(() => SidebarLayoutComponent)
};


@Component({
    selector: 'rs-ui-page-sidebar-layout',
    templateUrl: './sidebar-layout.component.html',
    styleUrls: ['./sidebar-layout.component.scss'],
    providers: [layoutComponentsConsumer],
    standalone: true,
    imports: [
        NgIf,
        NgTemplateOutlet,
        NzLayoutComponent,
        NzContentComponent,
        NzSiderComponent
    ]
})
export class SidebarLayoutComponent implements LayoutComponentsConsumer {
    protected templates: Map<LayoutComponentType, TemplateRef<void>> = new Map();
    protected LayoutComponentType: typeof LayoutComponentType = LayoutComponentType;

    removeComponent(layoutComponent: LayoutComponent): void {
    }

    setComponent(layoutComponent: LayoutComponent): void {
        this.templates.set(layoutComponent.type as LayoutComponentType, layoutComponent.template);
    }

}
