import {Component, ViewEncapsulation} from '@angular/core';
import {
    PopoverMenuComponent, RegisterDropdownMenuEntryDirective,
    RegisterMenuEntryDirective, RegisterMenuEntryDropdownContentDirective,
    SidebarMenuComponent
} from '@rs/uikit';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        NzIconDirective,
        RouterLink,
        NgClass,
        PopoverMenuComponent,
        RegisterMenuEntryDirective,
        SidebarMenuComponent,
        RegisterMenuEntryDropdownContentDirective,
        RegisterDropdownMenuEntryDirective
    ],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
}
