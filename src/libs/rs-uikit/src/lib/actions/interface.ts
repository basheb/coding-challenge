import {InjectionToken, TemplateRef} from '@angular/core';

export enum ActionType {
    default = 'default',
    danger = 'danger',
    primary = 'primary',
    secondary = 'secondary'
}

export type ActionStringType = Record<string, ActionType>;

export interface Action<TItem = any> {
    id: string;
    type: ActionType | keyof ActionStringType;
    click?: (item: TItem) => void;
    disabled?: (item: TItem) => boolean;
    disabledTooltip?: (item: TItem) => string;
    hidden?: (item: TItem) => boolean;
    template?: TemplateRef<{ $implicit: TItem }>;
}

export interface ActionsConsumer {
    setAction(action: Action): void;

    removeAction(action: Action): void;
}

export const ACTIONS_CONSUMER = new InjectionToken<ActionsConsumer>('ActionsConsumer');
