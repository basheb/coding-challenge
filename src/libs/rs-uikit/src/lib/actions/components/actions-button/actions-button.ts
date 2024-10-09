import {Component, computed, input, InputSignal, Signal, signal, WritableSignal} from '@angular/core';
import {Action, ActionsConsumer, ActionType} from '../../interface';
import {sortByGivenOrder} from '../../../utils/functions/sort-by-given-order';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet} from '@angular/common';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {ClickDelgatorDirective} from '../../directives/click-delgator.directive';
import {SetClassIfOnlyOneChildDirective} from '../../../utils/directives/set-class-if-only-one-child';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import produce from 'immer';
import {actionConsumerProviders} from '../../providers';

export type ButtonType = 'textButton' | 'primaryTextButton' | 'ellipsisButton' | 'ellipsisIcon' | 'buttonRow' | 'buttonRowNonPrimary'

@Component({
    selector: 'rs-ui-actions-button',
    templateUrl: './actions-button.html',
    styleUrls: ['./actions-button.scss'],
    providers: [
        ...actionConsumerProviders(ItemActionsButtonComponent),
    ],
    standalone: true,
    imports: [
        NgIf,
        NzButtonModule,
        NzDropDownModule,
        NzIconModule,
        ClickDelgatorDirective,
        SetClassIfOnlyOneChildDirective,
        NgTemplateOutlet,
        NgSwitch,
        NgForOf,
        NgSwitchCase,
        NzToolTipModule,
        NgSwitchDefault,
    ]
})
export class ItemActionsButtonComponent<TITem> implements ActionsConsumer {
    public item: InputSignal<TITem> = input.required();
    public buttonType: InputSignal<ButtonType> = input('ellipsisButton');
    public actions: InputSignal<Array<Action>> = input([]);
    public disabled: InputSignal<boolean> = input(false);

    public actionTypes: typeof ActionType = ActionType;
    protected registeredActions: WritableSignal<Array<Action>> = signal([]);
    protected allActions: Signal<Array<Action>> = computed(() => {
        const allActions = []
            .concat(this.actions())
            .concat(this.registeredActions());
        return sortByGivenOrder({
            order: [ActionType.primary, ActionType.secondary, ActionType.default, ActionType.danger],
            items: allActions,
            getSortByAttribute: item => item.type
        });
    });
    public secondaryAction: Signal<Action> = computed(() => {
        return this.allActions().find(action => action.type === ActionType.secondary);
    });
    public getOtherActions: Signal<Array<Action>> = computed(() => {
        return this
            .allActions()
            .filter(
                action => ![ActionType.primary, ActionType.secondary].includes(action.type as ActionType)
            );
    });
    protected primaryAction: Signal<Action> = computed(() => {
        return this.allActions().find(action => action.type === ActionType.primary);
    });

    public blurOnClick(): void {
        (document.activeElement as HTMLElement)?.blur();
    }

    public executeAction(action: Action): void {
        if ((!action.disabled || !action.disabled(this.item())) && typeof action.click === 'function') {
            action.click(this.item());
        }
    }

    public showTooltip(action: Action, item: TITem): boolean {
        return action.disabled && action.disabled(item) && !!action.disabledTooltip;
    }

    public getTooltip(action: Action, item: TITem): string {
        return action.disabledTooltip(item);
    }

    removeAction(action: Action): void {
        const update = produce(this.registeredActions(), draft => {
            const indexOfExisting = draft.findIndex(existing => existing.id === action.id);
            if (indexOfExisting !== -1) {
                draft.splice(indexOfExisting, 1);
            }
        });
        this.registeredActions.set(update);
    }

    setAction(action: Action): void {
        const update = produce(this.registeredActions(), draft => {
            const indexOfExisting = draft.findIndex(existing => existing.id === action.id);
            if (indexOfExisting !== -1) {
                draft[indexOfExisting] = action;
            } else {
                draft.push(action);
            }
        });
        this.registeredActions.set(update);
    }

    protected onActionsChange(actions: Array<Action>): void {
    }
}

