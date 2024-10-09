import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzPopoverDirective} from 'ng-zorro-antd/popover';
import {CommonModule, NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import {PopoverMenuComponent} from '../../popover-menu/popover-menu.component';
import {MenuEntry} from '../../../src/menu-entry';
import {SidebarMenuEntryComponent} from '../sidebar-menu-entry/sidebar-menu-entry.component';
import {RegisterMenuEntryDirective} from '../../../index';

@Component({
    selector: 'rs-ui-sidebar-menu-popover-entry',
    templateUrl: './sidebar-menu-popover-entry.component.html',
    styleUrls: ['./sidebar-menu-popover-entry.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        NzIconDirective,
        NzMenuDirective,
        NzPopoverDirective,
        NzMenuItemComponent,
        NgTemplateOutlet,
        RouterLink,
        NgClass,
        NgIf,
        PopoverMenuComponent,
        RegisterMenuEntryDirective,
        SidebarMenuEntryComponent
    ]
})
export class SidebarMenuPopoverEntryComponent {
    @Input({required: true})
    public entry: MenuEntry;

    @Input()
    public disableUrl: boolean;

    @Input()
    public activeUrl: string;

    @Input()
    public upcomingUrl: string;

    constructor(private cdr: ChangeDetectorRef) {
    }
}
