import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IMenuEntryProperties, Menu} from '../../index';
import {MenuEntriesConsumer} from '../../src/interface';
import {MenuEntry} from '../../src/menu-entry';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NgTemplateOutlet} from '@angular/common';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'rs-ui-radio-group-menu',
    templateUrl: './radio-group-menu.component.html',
    styleUrls: ['./radio-group-menu.component.scss'],
    standalone: true,
    imports: [
        NzIconDirective,
        NgTemplateOutlet,
        NzRadioGroupComponent,
        NzRadioComponent,
        FormsModule
    ]
})
export class RadioGroupMenuComponent implements OnChanges, MenuEntriesConsumer {
    @Input()
    public menuEntries: Array<MenuEntry>;

    @Input()
    public activeEntry: MenuEntry;

    @Input()
    public activeEntryId: string;

    @Output()
    public activate: EventEmitter<MenuEntry> = new EventEmitter<MenuEntry>();

    public menu: Menu<IMenuEntryProperties> = new Menu<IMenuEntryProperties>();

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['menuEntries']) {
            this.menuEntries.forEach(entry => this.menu.registerEntry(entry));
        }
        this.setInitialActiveMenuEntry();
    }

    public setMenuEntry(entry: MenuEntry): void {
        const existing: MenuEntry = this.menu
            .getEntries()
            .find(fentry => fentry.properties.id === entry.properties.id);
        if (existing) {
            Object.assign(existing, entry);
        } else {
            this.menu.registerEntry(entry);
        }
        this.setInitialActiveMenuEntry();
        this.triggerViewUpdate();
    }

    public removeMenuEntry(entry: MenuEntry): void {
        this.menu.removeEntry(entry);
        if (entry?.properties.id === this.activeEntry?.properties.id) {
            this.activeEntry = null;
            this.setInitialActiveMenuEntry();
        }
        this.triggerViewUpdate();
    }

    public triggerViewUpdate(): void {
        this.menuEntries = this.menu.getEntries().sort((a, b) => (a.properties.order || 0) - (b.properties.order || 0));
        if (this.activeEntryId) {
            this.activeEntry = this.menuEntries.find(entry => entry.properties.id === this.activeEntryId);
        } else {
            this.activeEntry = this.menuEntries[0];
        }
        this.cdr.markForCheck();
    }

    public activateMenuEntry(menuEntry: MenuEntry): void {
        this.activate.emit(menuEntry);
        this.activeEntry = menuEntry;
    }

    private setInitialActiveMenuEntry(): void {
        let firstActiveEntry: MenuEntry;
        if (this.activeEntryId) {
            firstActiveEntry = this.menuEntries.find(entry => entry.properties.id === this.activeEntryId);
        }

        if (!firstActiveEntry && this.activeEntry) {
            firstActiveEntry = this.menuEntries.find(entry => entry.properties.id === this.activeEntry?.properties.id);
        }

        if (!firstActiveEntry) {
            firstActiveEntry = (
                this.menuEntries.find(entry => entry.properties.active) ||
                this.menuEntries[0]
            );
        }
        this.activateMenuEntry(firstActiveEntry);
    }
}
