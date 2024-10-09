import {forwardRef, InjectionToken, Type} from '@angular/core';
import {ACTIONS_CONSUMER, ActionsConsumer} from '../interface';

export function actionConsumerProviders(cls: Type<ActionsConsumer>): {
    provide: InjectionToken<ActionsConsumer>;
    useExisting: Type<any>
}[] {
    return [
        {
            provide: ACTIONS_CONSUMER,
            useExisting: forwardRef(() => cls)
        }
    ];
}
