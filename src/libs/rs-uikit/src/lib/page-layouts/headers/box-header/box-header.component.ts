import {Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';
import {Action, ActionsConsumer} from '../../../actions/interface';
import {MENU_ENTRIES_CONSUMER, MenuEntriesConsumer} from '../../../menu/src/interface';
import {MenuEntry} from '../../../menu/src/menu-entry';
import {HEADER_COMPONENT} from '../../interface';
import {NgClass, NgIf} from '@angular/common';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {ItemActionsButtonComponent} from '../../../actions/components/actions-button/actions-button';
import {TabBarMenuComponent} from '../../../menu/components/tabbar-menu/tab-bar-menu.component';
import {actionConsumerProviders} from '../../../actions/providers';

const menuEntriesConsumerProvider: any = {
    provide: MENU_ENTRIES_CONSUMER,
    useExisting: forwardRef(() => BoxHeaderComponent)
};

const headerProvider = {
    provide: HEADER_COMPONENT,
    useExisting: forwardRef(() => BoxHeaderComponent),
};

@Component({
    selector: 'rs-ui-box-header',
    templateUrl: './box-header.component.html',
    styleUrls: ['./box-header.component.scss'],
    providers: [
        menuEntriesConsumerProvider,
        ...actionConsumerProviders(BoxHeaderComponent),
        headerProvider
    ],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        NzIconDirective,
        ItemActionsButtonComponent,
        TabBarMenuComponent
    ]
})
export class BoxHeaderComponent<TItem = any> implements MenuEntriesConsumer, ActionsConsumer, ControlValueAccessor {
    @Input()
    public title: string;

    @Input()
    public icon: string;

    @Input()
    public item: TItem;

    @Output()
    activate: EventEmitter<MenuEntry> = new EventEmitter();

    public menuEntries: Array<MenuEntry> = [];
    public actions: Array<Action> = [];
    public query: string;
    private onChange: (val: string) => void;
    private onTouch: () => void;

    constructor(private el: ElementRef<HTMLElement>) {
    }

    removeAction(action: Action): void {
        const indexOfExisting: number = this.actions.indexOf(action);
        if (indexOfExisting !== -1) {
            this.actions.splice(indexOfExisting, 1);
            this.actions = this.actions.slice();
        }
    }

    removeMenuEntry(menuEntry: MenuEntry): void {
        const indexOfExisting: number = this.menuEntries.indexOf(menuEntry);
        if (indexOfExisting !== -1) {
            this.menuEntries.splice(indexOfExisting, 1);
        }
        this.menuEntries = this.menuEntries.slice();
        this.triggerViewUpdate();
    }

    setAction(action: Action): void {
        const indexOfExisting: number = this.actions.indexOf(action);
        if (indexOfExisting !== -1) {
            this.actions[indexOfExisting] = action;
        } else {
            this.actions.push(action);
        }
        this.actions = this.actions.slice();
        this.triggerViewUpdate();
    }

    setMenuEntry(menuEntry: MenuEntry): void {
        const indexOfExisting: number = this.menuEntries.indexOf(menuEntry);
        if (indexOfExisting !== -1) {
            this.menuEntries[indexOfExisting] = menuEntry;
        } else {
            this.menuEntries.push(menuEntry);
        }
        this.menuEntries = this.menuEntries.slice();
        this.triggerViewUpdate();
    }

    triggerViewUpdate(): void {
        if (this.actions?.length > 0) {
            this.el.nativeElement.classList.add('has-actions');
        } else {
            this.el.nativeElement.classList.remove('has-actions');
        }

        if (this.menuEntries?.length > 1) {
            this.el.nativeElement.classList.add('has-menu');
        } else {
            this.el.nativeElement.classList.remove('has-menu');
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(query: any): void {
        this.query = query;
    }

    public updateQuery(query: string): void {
        this.onChange(query);
    }
}
