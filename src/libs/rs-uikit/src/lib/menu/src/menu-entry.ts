import {IMenuEntryProperties} from './interface';
import {routeToRegExp} from './route-to-reg-exp';

export class MenuEntry<TProperties extends IMenuEntryProperties = IMenuEntryProperties> {
    public properties: TProperties;

    constructor(props: Partial<IMenuEntryProperties>) {
        this.properties = props as TProperties;
    }

    public update(props: Partial<IMenuEntryProperties>): void {
        this.properties = Object.assign({}, this.properties, props);
    }

    isActive(url?: string): boolean {
        if (this.properties.active) {
            return true;
        } else if (url && this.properties.activeUrls) {
            return this
                .properties
                .activeUrls
                .some(
                    matchUrl => !!url.match(routeToRegExp(matchUrl))
                );
        } else {
            return false;
        }
    }

    getActiveSubEntry(url?: string): MenuEntry | undefined {
        return this.properties.subEntries?.find(entry => entry.isActive(url));
    }

    hasActiveSubEntry(url?: string): boolean {
        return this.properties.subEntries && this.getActiveSubEntry(url) instanceof MenuEntry;
    }

    hasSubEntries(): boolean {
        return this.properties.subEntries && this.properties.subEntries.length > 0;
    }

    canBeExecuted(): boolean {
        return typeof this.properties.click === 'function';
    }

    exec(): void {
        this.properties.click(Object.assign({}, this.properties));
    }
}
