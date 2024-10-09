import {Action, ActionType} from '../interface';
import {ChangeDetectorRef, Directive} from '@angular/core';

@Directive({ standalone: true })
export abstract class AbstractActionsContainer {
    public readonly actions: Array<Action> = [];
    public readonly actionTypes: typeof ActionType = ActionType;

    constructor(protected cdr: ChangeDetectorRef) {
    }

    public setOption(action: Action): void {
        const existing = this.actions.find(existing => existing.template === action.template);
        if (!existing) {
            this.actions.push(action);
        } else {
            Object.assign(existing, action);
        }
        this.onActionsChange(this.actions);
        this.cdr.markForCheck();
    }

    public removeOption(action: Action): void {
        const indexOfExisting = this.actions.indexOf(action);
        if (typeof indexOfExisting === 'number') {
            this.actions.splice(indexOfExisting, 1);
            this.onActionsChange(this.actions);
            this.cdr.markForCheck();
        }
    }

    protected abstract onActionsChange(actions: Array<Action>): void;
}
