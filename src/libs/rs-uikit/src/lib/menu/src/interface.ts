import {EventEmitter, InjectionToken, TemplateRef} from '@angular/core';
import {MenuEntry} from './menu-entry';

export interface IMenuEntryProperties<TData = any> {
    id: string;
    subEntries?: Array<MenuEntry<IMenuEntryProperties>>;
    url?: string | Array<string>;
    activeUrls?: Array<string>;
    active?: boolean;
    disabled?: boolean;
    templateRef?: TemplateRef<any>;
    order?: number;
    hasRipple?: boolean;
    icon?: string;
    iconStyle?: 'outline' | 'fill' | 'twotone';
    click?: (properties: IMenuEntryProperties) => void;
    data?: TData;
}

export interface MenuEntriesConsumer {
    activate: EventEmitter<MenuEntry>;

    setMenuEntry(menuEntry: MenuEntry): void;

    removeMenuEntry(menuEntry: MenuEntry): void;

    triggerViewUpdate(): void;
}

export const MENU_ENTRIES_CONSUMER = new InjectionToken<MenuEntriesConsumer>('MenuEntriesConsumer');
