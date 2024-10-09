import {
    computed,
    Directive,
    effect,
    inject,
    InputSignal,
    OnDestroy,
    signal,
    Signal,
    TemplateRef,
    ViewContainerRef,
    WritableSignal
} from '@angular/core';
import {Action, ACTIONS_CONSUMER, ActionsConsumer, ActionType } from '../interface';

@Directive()
export abstract class AbstractAction<TItem> implements OnDestroy {
    public abstract options: InputSignal<Partial<Action<TItem>>>;
    public abstract useTypeFrom: InputSignal<any>;

    protected parent: ActionsConsumer = inject(ACTIONS_CONSUMER);
    protected viewContainer: ViewContainerRef = inject(ViewContainerRef);
    protected templateRef: TemplateRef<{ $implicit: TItem }> = inject(TemplateRef);

    protected action: WritableSignal<Action<TItem>>;
    protected configuredAction: Signal<Action<TItem>>;

    constructor() {
        this.action = signal({
            id: Math.random().toString(),
            type: ActionType.default,
            template: this.templateRef
        });
        this.configuredAction = computed(() => {
            return Object.assign({}, this.action(), this.options());
        });
        effect(() => {
            this.parent.setAction(this.configuredAction());
        }, {allowSignalWrites: true});
    }

    ngOnDestroy(): void {
        this.parent.removeAction(this.action());
    }
}
