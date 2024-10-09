import {Directive, Host, Inject, Input, OnChanges, OnDestroy, OnInit, Self, SimpleChanges, SkipSelf, TemplateRef} from '@angular/core';
import {IMenuEntryProperties, MENU_ENTRIES_CONSUMER, MenuEntriesConsumer} from '../src/interface';
import {MenuEntry} from '../src/menu-entry';

@Directive({
    selector: '[rsUiMenuEntry]',
    standalone: true
})
export class RegisterMenuEntryDirective implements OnInit, OnChanges, OnDestroy {
    @Input('rsUiMenuEntry')
    public properties?: Partial<IMenuEntryProperties>;

    public menuEntry: MenuEntry;

    constructor(
        @Host() @SkipSelf() @Inject(MENU_ENTRIES_CONSUMER) private menu: MenuEntriesConsumer,
        private templateRef: TemplateRef<void>
    ) {
        this.menuEntry = new MenuEntry({
            id: Math.random().toString(36).substring(2, 9),
            templateRef: this.templateRef,
        });
    }

    ngOnInit(): void {
        this.menuEntry.update(this.properties);
        this.menu.setMenuEntry(this.menuEntry);
        this.menu.triggerViewUpdate();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const hasChanges = changes?.properties && changes?.properties?.currentValue !== changes?.properties?.previousValue;
        if (hasChanges) {
            this.menuEntry.update(this.properties);
            this.menu.triggerViewUpdate();
        }
    }

    ngOnDestroy(): void {
        this.menu.removeMenuEntry(this.menuEntry);
        this.menu.triggerViewUpdate();
    }
}
