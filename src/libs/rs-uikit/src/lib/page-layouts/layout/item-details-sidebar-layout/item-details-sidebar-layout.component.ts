import {AfterViewInit, Component, ContentChildren, ElementRef, forwardRef, Input, OnDestroy, QueryList} from '@angular/core';
import {HEADER_COMPONENT, LAYOUT_COMPONENTS_CONSUMER} from '../../interface';
import {SidebarLayoutComponent} from '../sidebar-layout/sidebar-layout.component';
import {Subscription} from 'rxjs';
import {observeElementSize} from '../../../utils/functions/observe-element-size';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {NzContentComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {Action, actionConsumerProviders, ACTIONS_CONSUMER, ActionsConsumer, ItemActionsButtonComponent} from '../../../actions';

const layoutComponentsConsumer: any = {
    provide: LAYOUT_COMPONENTS_CONSUMER,
    useExisting: forwardRef(() => ItemDetailsSidebarLayoutComponent)
};

@Component({
    selector: 'rs-ui-item-details-sidebar-layout',
    templateUrl: './item-details-sidebar-layout.component.html',
    styleUrls: ['./item-details-sidebar-layout.component.scss'],
    providers: [
        layoutComponentsConsumer,
        ...actionConsumerProviders(ItemDetailsSidebarLayoutComponent),
    ],
    standalone: true,
    imports: [
        NgIf,
        NgTemplateOutlet,
        NzLayoutComponent,
        NzContentComponent,
        NzSiderComponent,
        ItemActionsButtonComponent
    ]
})
export class ItemDetailsSidebarLayoutComponent<TItem> extends SidebarLayoutComponent implements AfterViewInit, OnDestroy, ActionsConsumer {
    @Input()
    public item: TItem;

    @ContentChildren(HEADER_COMPONENT, {read: ElementRef})
    public header: QueryList<HTMLElement>;

    public headerSizeSubscription: Subscription;
    protected actions: Array<Action> = [];

    constructor(private el: ElementRef<HTMLElement>) {
        super();
    }

    ngAfterViewInit(): void {
        this.header.changes.subscribe(el => {
            const headerHeight: number = el.first?.nativeElement.offsetHeight + parseFloat(window.getComputedStyle(el.first?.nativeElement).marginBottom);
            if (headerHeight) {
                this.el.nativeElement.style.setProperty('--header-height', `${headerHeight}px`);
            }

            if (el.first?.nativeElement) {
                this.headerSizeSubscription?.unsubscribe();
                this.headerSizeSubscription = observeElementSize(el.first?.nativeElement)
                    .subscribe(
                        ev => {
                            const newHeight: number = ev.contentRect.height + parseFloat(window.getComputedStyle(el.first?.nativeElement).marginBottom);
                            this.el.nativeElement.style.setProperty('--header-height', `${newHeight}px`);
                        }
                    );
            }
        });
    }

    ngOnDestroy(): void {
        this.headerSizeSubscription?.unsubscribe();
    }

    setAction(action: Action<any>): void {
        const indexOfExisting = this.actions.findIndex(existing => existing.id === action.id);
        if (indexOfExisting !== -1) {
            this.actions[indexOfExisting] = action;
        } else {
            this.actions.push(action);
        }
    }

    removeAction(action: Action<any>): void {
        const indexOfExisting = this.actions.findIndex(existing => existing.id === action.id);
        if (indexOfExisting !== -1) {
            this.actions.splice(indexOfExisting, 1);
        }
    }

}
