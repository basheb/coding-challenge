import {Component, EventEmitter, forwardRef, Output, TemplateRef} from '@angular/core';
import {ACTIONS_CONSUMER} from '../../../actions/interface';
import {MENU_ENTRIES_CONSUMER} from '../../../menu/src/interface';
import {HEADER_COMPONENT} from '../../interface';
import {BoxHeaderComponent} from '../box-header/box-header.component';
import {NgClass, NgIf, NgTemplateOutlet} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {ItemActionsButtonComponent} from '../../../actions/components/actions-button/actions-button';
import {TabBarMenuComponent} from '../../../menu/components/tabbar-menu/tab-bar-menu.component';

const menuEntriesConsumerProvider: any = {
    provide: MENU_ENTRIES_CONSUMER,
    useExisting: forwardRef(() => ItemDetailsBoxHeaderComponent)
};

const actionsConsumerProvider: any = {
    provide: ACTIONS_CONSUMER,
    useExisting: forwardRef(() => ItemDetailsBoxHeaderComponent)
};

const headerProvider = {
    provide: HEADER_COMPONENT,
    useExisting: forwardRef(() => ItemDetailsBoxHeaderComponent),
};

@Component({
    selector: 'rs-ui-item-details-box-header',
    templateUrl: './item-details-box-header.component.html',
    styleUrls: ['./item-details-box-header.component.scss'],
    providers: [
        menuEntriesConsumerProvider,
        actionsConsumerProvider,
        headerProvider
    ],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        NzButtonComponent,
        NzIconDirective,
        ItemActionsButtonComponent,
        NgTemplateOutlet,
        TabBarMenuComponent
    ]
})
export class ItemDetailsBoxHeaderComponent extends BoxHeaderComponent {
    @Output()
    public back: EventEmitter<void> = new EventEmitter();

    public titleTmpl: TemplateRef<void>;
}
