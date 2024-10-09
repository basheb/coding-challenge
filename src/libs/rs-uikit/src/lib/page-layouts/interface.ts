import { InjectionToken, TemplateRef } from '@angular/core';

export enum LayoutComponentType {
    header = 'header',
    main = 'main',
    sidebar = 'sidebar'
}

export interface LayoutComponent {
    id: string;
    type: LayoutComponentType | keyof Record<string, LayoutComponentType>;
    template: TemplateRef<void>
}

export interface LayoutComponentsConsumer {
    setComponent(layoutComponent: LayoutComponent): void;

    removeComponent(layoutComponent: LayoutComponent): void;
}

export const LAYOUT_COMPONENTS_CONSUMER = new InjectionToken<LayoutComponent>('LayoutComponentsConsumer');

export const HEADER_COMPONENT = new InjectionToken<LayoutComponent>('HEADER_COMPONENT');
