import {Component, forwardRef, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal} from '@angular/core';
import {HEADER_COMPONENT} from '../../interface';
import {BoxHeaderComponent} from '../box-header/box-header.component';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {ItemActionsButtonComponent} from '../../../actions/components/actions-button/actions-button';
import produce from 'immer';
import { actionConsumerProviders } from '../../../actions/providers/action-consumer.provider';
import {Action, ActionsConsumer} from '../../../actions/interface';

const headerProvider = {
    provide: HEADER_COMPONENT,
    useExisting: forwardRef(() => BoxHeaderComponent),
};

@Component({
    selector: 'rs-ui-page-text-header',
    templateUrl: './text-header.component.html',
    styleUrls: ['./text-header.component.scss'],
    providers: [
        ...actionConsumerProviders(TextHeaderComponent),
        headerProvider
    ],
    standalone: true,
    imports: [
        NzPageHeaderModule,
        ItemActionsButtonComponent
    ]
})
export class TextHeaderComponent<TItem> implements ActionsConsumer {
    public item: InputSignal<TItem> = input();
    public back: OutputEmitterRef<void> = output();

    protected actions: WritableSignal<Array<Action<TItem>>> = signal([]);

    public onBackClick(): void {
        this.back.emit();
    }

    removeAction(action: Action): void {
        const update = produce(this.actions(), draft => {
            const existingIndex: number = draft.findIndex(entry => entry.id === action.id);
            if (existingIndex !== -1) {
                draft.splice(existingIndex, 1);
            }
        });
        this.actions.set(update);
    }

    setAction(action: Action): void {
        const update = produce(this.actions(), draft => {
            const existingIndex: number = draft.findIndex(entry => entry.id === action.id);
            if (existingIndex !== -1) {
                draft[existingIndex] = action;
            } else {
                draft.push(action);
            }
        });
        this.actions.set(update);
    }
}
