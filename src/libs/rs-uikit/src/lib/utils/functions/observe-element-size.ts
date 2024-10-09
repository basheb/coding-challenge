import {Observable} from 'rxjs';

/**
 * Observe size changes of an element with the resize observer api.
 * It will emit as soon as the size (width or height) of the element was changed. This can happen because of DOM changes or CSS changes
 */
export function observeElementSize<TElement extends HTMLElement>(el: TElement): Observable<ResizeObserverEntry> {
    return new Observable(observer => {
        const resizeObserver = new ResizeObserver((entries) => {
            const result = entries[0];
            observer.next(result);
        });

        resizeObserver.observe(el);

        return () => resizeObserver.disconnect();
    });
}
