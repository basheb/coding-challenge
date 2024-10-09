import {Directive, input, InputSignal} from '@angular/core';
import {Action} from '../interface';
import {AbstractAction} from './abstract.action.directive';

@Directive({
    selector: '[rsUiAction]',
    standalone: true,
})
export class ActionDirective<TItem> extends AbstractAction<TItem> {
    public options: InputSignal<Partial<Action<TItem>>> = input({}, {alias: 'rsUiActionOptions'});
    public useTypeFrom: InputSignal<TItem> = input(undefined, {alias: 'rsUiActionUseTypeFrom'});

    public static ngTemplateContextGuard<TContext>(
        directive: ActionDirective<TContext>,
        context: unknown
    ): context is { $implicit: TContext } {
        return true;
    }
}
