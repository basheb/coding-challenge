import {IMenuEntryProperties} from './interface';
import {MenuEntry} from './menu-entry';

export class Menu<TProperties extends IMenuEntryProperties> {
    private entries: Array<MenuEntry<TProperties>>;

    constructor() {
        this.entries = [];
    }

    public getEntries(): Array<MenuEntry<TProperties>> {
        return this.entries;
    }

    public registerEntry(entry: MenuEntry<TProperties>): void {
        const existing = this.entries.find(existing => existing.properties.id === entry.properties.id);
        if (!existing) {
            this.entries.push(entry);
        }
    }

    public removeEntry(entry: MenuEntry<TProperties>): void {
        const existing: MenuEntry<TProperties> = this.entries.find(fentry => fentry.properties.id === entry.properties.id);
        if (existing) {
            this.entries.splice(this.entries.indexOf(existing), 1);
        }
    }

    public getMatchingEntryForUrl(url: string): MenuEntry<TProperties> {
        return this.entries.find(entry => entry.isActive(url));
    }

    public getActiveEntry(): MenuEntry {
        return this.entries.find(entry => entry.isActive() || entry.hasActiveSubEntry());
    }
}
