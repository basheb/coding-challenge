import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {IMenuEntryProperties, MENU_ENTRIES_CONSUMER, MenuEntriesConsumer} from '../../src/interface';
import {Menu} from '../../src/menu';
import {MenuEntry} from '../../src/menu-entry';
import {SidebarMenuEntryComponent} from './sidebar-menu-entry/sidebar-menu-entry.component';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {SidebarMenuPopoverEntryComponent} from './sidebar-menu-popover-entry/sidebar-menu-popover-entry.component';

const menuEntriesConsumerProvider: any = {
    provide: MENU_ENTRIES_CONSUMER,
    useExisting: forwardRef(() => SidebarMenuComponent)
};

export enum SidebarMenuActivationMode {
    onClick,
    onUrlChange
}

@Component({
    selector: 'rs-ui-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [menuEntriesConsumerProvider],
    standalone: true,
    imports: [
        SidebarMenuEntryComponent,
        NzTooltipDirective,
        SidebarMenuPopoverEntryComponent
    ]
})
export class SidebarMenuComponent<TMenuEntryProperties extends IMenuEntryProperties>
    implements MenuEntriesConsumer, OnInit, AfterViewInit, OnDestroy {

    @Input()
    menuStyle: 'auto' | 'popover' | 'dropdown' = 'auto';

    @Input()
    activationMode: SidebarMenuActivationMode = SidebarMenuActivationMode.onClick;

    @Output()
    public activate: EventEmitter<MenuEntry> = new EventEmitter();

    public menu: Menu<TMenuEntryProperties>;
    public menuEntries: Array<MenuEntry<TMenuEntryProperties>>;
    private upcomingUrl: string;
    private activeUrl: string;
    private canUpdate: boolean;
    private renderSubject: Subject<void>;
    private subscriptions: Subscription;

    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        this.menu = new Menu();
        this.renderSubject = new Subject();
        this.subscriptions = new Subscription();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this
                .renderSubject
                .pipe(
                    debounceTime(10)
                )
                .subscribe(_ => this.cdr.detectChanges())
        );

        this.subscriptions.add(
            this.router
                .events
                .pipe(
                    filter(ev => ev instanceof NavigationStart)
                )
                .subscribe(
                    (ev: NavigationStart) => {
                        this.upcomingUrl = ev.url;
                        this.triggerViewUpdate();
                    }
                )
        );

        this.subscriptions.add(
            this.router
                .events
                .pipe(
                    filter(ev => ev instanceof NavigationEnd || ev instanceof NavigationError)
                )
                .subscribe(
                    _ => {
                        this.activeUrl = this.router.url;
                        this.upcomingUrl = null;
                        this.activate.emit(this.menu.getMatchingEntryForUrl(this.activeUrl));
                        this.triggerViewUpdate();
                    }
                )
        );

        this.activeUrl = this.router.url;
    }

    ngAfterViewInit(): void {
        this.canUpdate = true;

        if (this.activationMode === SidebarMenuActivationMode.onClick && !this.menu.getActiveEntry()) {
            this.menu.getEntries()[0].properties.active = true;
            this.activate.emit(this.menu.getEntries()[0]);
        }

        this.triggerViewUpdate();
    }

    ngOnDestroy(): void {
        this.renderSubject.complete();
        this.canUpdate = false;
        this.subscriptions.unsubscribe();
    }

    public trackBy(index: number, item: MenuEntry<any>): string {
        return item.properties.id;
    }

    public getMenuEntries(): Array<MenuEntry<TMenuEntryProperties>> {
        return this.menu.getEntries();
    }

    public setMenuEntry(entry: MenuEntry<TMenuEntryProperties>): void {
        const existing: MenuEntry = this.menu
            .getEntries()
            .find(fentry => fentry.properties.id === entry.properties.id);
        if (existing) {
            Object.assign(existing, entry);
        } else {
            this.menu.registerEntry(entry);
        }
        this.triggerViewUpdate();
    }

    public removeMenuEntry(entry: MenuEntry<TMenuEntryProperties>): void {
        this.menu.removeEntry(entry);
        this.triggerViewUpdate();
    }

    public getActiveUrl(): string {
        return this.activeUrl;
    }

    public getUpcomingUrl(): string {
        return this.upcomingUrl;
    }

    public triggerViewUpdate(): void {
        this.menuEntries = this.menu.getEntries().sort((a, b) => (a.properties.order || 0) - (b.properties.order || 0));
        if (this.canUpdate) {
            this.renderSubject.next();
        }
    }

    public activateEntry(entry: MenuEntry): void {
        if (this.activationMode === SidebarMenuActivationMode.onClick) {
            this.menu
                .getEntries()
                .forEach(
                    entry => {
                        const activeSubEntry = entry.getActiveSubEntry();
                        if (entry.properties.active) {
                            entry.properties.active = false;
                        }
                        if (activeSubEntry) {
                            activeSubEntry.properties.active = false;
                        }
                    });
            entry.properties.active = true;
            this.activate.emit(entry);
        }
    }
}
