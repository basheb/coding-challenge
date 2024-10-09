import {
    Directive, EventEmitter, forwardRef,
    Host,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    SkipSelf,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import {IMenuEntryProperties, MENU_ENTRIES_CONSUMER, MenuEntriesConsumer} from '../src/interface';
import {MenuEntry} from '../src/menu-entry';
import {SidebarMenuComponent} from '../components/sidebar-menu/sidebar-menu.component';

const menuEntriesConsumerProvider: any = {
    provide: MENU_ENTRIES_CONSUMER,
    useExisting: forwardRef(() => RegisterDropdownMenuEntryDirective)
};

@Directive({
    selector: '[rsUiDropdownMenuEntry]',
    providers: [menuEntriesConsumerProvider],
    standalone: true
})
export class RegisterDropdownMenuEntryDirective implements MenuEntriesConsumer, OnInit, OnChanges, OnDestroy {
    @Input('rsUiDropdownMenuEntry')
    public properties: Partial<IMenuEntryProperties>;

    public menuEntry: MenuEntry;
    public activate: EventEmitter<MenuEntry<IMenuEntryProperties<any>>>;
    public template: TemplateRef<void>;

    private id: string;

    constructor(
        @SkipSelf() @Inject(MENU_ENTRIES_CONSUMER) private menu: MenuEntriesConsumer
    ) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.menuEntry = new MenuEntry({
            id: this.id,
            templateRef: this.template,
            subEntries: []
        });
    }

    ngOnInit(): void {
        this.menuEntry.update(this.properties);
        this.menu.setMenuEntry(this.menuEntry);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['properties'] &&
            JSON.stringify(changes['properties'].currentValue) !== JSON.stringify(changes['properties']?.previousValue)
        ) {
            this.menuEntry.update(this.properties);
            this.menu.triggerViewUpdate();
        }
    }

    ngOnDestroy(): void {
        this.menu.removeMenuEntry(this.menuEntry);
    }

    public setContentTemplate(templateRef: TemplateRef<void>): void{
        this.menuEntry.update({templateRef});
        this.menu.triggerViewUpdate();
    }

    public registerSubEntries(entry: MenuEntry): void {
        const existing: MenuEntry = this.menuEntry.properties.subEntries.find(fentry => fentry === entry || fentry.properties.id === entry.properties.id);
        if (existing) {
            Object.assign(existing, entry);
        } else {
            this.menuEntry.properties.subEntries.push(entry);
        }
        this.menu.triggerViewUpdate();
    }

    public unRegisterSubEntries(entry: MenuEntry): void {
        const existing = this.menuEntry.properties.subEntries.find(existing => entry === existing || entry.properties.id === existing.properties.id);
        if (existing) {
            this.menuEntry.properties.subEntries.splice(this.menuEntry.properties.subEntries.indexOf(existing), 1);
            this.menu.triggerViewUpdate();
        }
    }

    setMenuEntry(menuEntry: MenuEntry<IMenuEntryProperties<any>>): void {
        this.registerSubEntries(menuEntry);
    }

    removeMenuEntry(menuEntry: MenuEntry<IMenuEntryProperties<any>>): void {
        this.unRegisterSubEntries(menuEntry);
    }

    triggerViewUpdate(): void {
        this.menu.triggerViewUpdate();
    }
}
