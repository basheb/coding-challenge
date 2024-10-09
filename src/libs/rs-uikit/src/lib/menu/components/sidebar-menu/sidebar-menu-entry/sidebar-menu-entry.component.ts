import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzPopoverDirective} from 'ng-zorro-antd/popover';
import {CommonModule, NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import { PopoverMenuComponent } from '../../popover-menu/popover-menu.component';
import { MenuEntry } from '../../../src/menu-entry';
import {IMenuEntryProperties, RegisterMenuEntryDirective} from '../../../index';

@Component({
    selector: 'rs-ui-sidebar-menu-entry',
    templateUrl: './sidebar-menu-entry.component.html',
    styleUrls: ['./sidebar-menu-entry.component.scss'],
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
        RegisterMenuEntryDirective
    ]
})
export class SidebarMenuEntryComponent {
    @Input({required: true})
    public entry: MenuEntry;

    @Input()
    public active: boolean;

    @Input()
    public disableUrl: boolean;

    @Input()
    public activeUrl: string;

    @Input()
    public upcomingUrl: string;
}
