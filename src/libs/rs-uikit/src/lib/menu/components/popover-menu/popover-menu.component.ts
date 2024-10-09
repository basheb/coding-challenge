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
    Output, TemplateRef, ViewChild
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';
import {IMenuEntryProperties, MENU_ENTRIES_CONSUMER, MenuEntriesConsumer} from '../../src/interface';
import {Menu} from '../../src/menu';
import {MenuEntry} from '../../src/menu-entry';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuGroupComponent, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {NzPopoverDirective} from 'ng-zorro-antd/popover';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterLink} from '@angular/router';
import {NzTooltipTrigger} from 'ng-zorro-antd/tooltip';

const menuEntriesConsumerProvider: any = {
    provide: MENU_ENTRIES_CONSUMER,
    useExisting: forwardRef(() => PopoverMenuComponent)
};

@Component({
    selector: 'rs-ui-popover-menu',
    templateUrl: './popover-menu.component.html',
    styleUrls: ['./popover-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [menuEntriesConsumerProvider],
    standalone: true,
    imports: [
        NzIconDirective,
        NzMenuDirective,
        NzPopoverDirective,
        NzMenuItemComponent,
        NgTemplateOutlet,
        RouterLink,
        NgClass
    ]
})
export class PopoverMenuComponent<TMenuEntryProperties extends IMenuEntryProperties>
    implements MenuEntriesConsumer, OnInit, AfterViewInit, OnDestroy {

    @Input()
    public placement: string | Array<string>;

    @Input()
    public disabled: boolean;

    @Input()
    public trigger: NzTooltipTrigger = 'click';

    @Output()
    public activate: EventEmitter<MenuEntry> = new EventEmitter();

    @Output()
    public visibleChange: EventEmitter<boolean> = new EventEmitter();

    public visible: boolean;
    public menu: Menu<TMenuEntryProperties>;
    public menuEntries: Array<MenuEntry<TMenuEntryProperties>>;
    public content: TemplateRef<any>;
    public activeUrl: string;
    public upcomingUrl: string;

    private canUpdate: boolean;
    private renderSubject: Subject<void>;
    private subscriptions: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router
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
                .subscribe(_ => this.cdr.markForCheck())
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
        this.triggerViewUpdate();
    }

    ngOnDestroy(): void {
        this.renderSubject.complete();
        this.canUpdate = false;
        this.subscriptions.unsubscribe();
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

    public triggerViewUpdate(): void {
        this.menuEntries = this.menu.getEntries().sort((a, b) => (a.properties.order || 0) - (b.properties.order || 0));
        if (this.canUpdate) {
            this.renderSubject.next();
        }
    }

    public close(): void{
        setTimeout(() => {
            this.visible = false;
            this.cdr.markForCheck();
        });
    }

    protected onMenuItemClick(menuEntry: MenuEntry): void {
        if (menuEntry.canBeExecuted()) {
            menuEntry.exec();
        }
        this.close();
    }

    protected onVisibleChange(): void {
        this.visibleChange.emit(this.visible);
    }
}
