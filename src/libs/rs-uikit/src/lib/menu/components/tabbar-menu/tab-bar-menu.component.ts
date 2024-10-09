import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import {
  NzTabChangeEvent,
  NzTabComponent,
  NzTabSetComponent,
} from 'ng-zorro-antd/tabs';
import { IMenuEntryProperties, Menu, MENU_ENTRIES_CONSUMER } from '../../index';
import { MenuEntriesConsumer } from '../../src/interface';
import { MenuEntry } from '../../src/menu-entry';

@Component({
  selector: 'rs-ui-tab-bar-menu',
  templateUrl: './tab-bar-menu.component.html',
  styleUrls: ['./tab-bar-menu.component.scss'],
  standalone: true,
  imports: [
    NzTabSetComponent,
    NzTabComponent,
    NzIconDirective,
    NgTemplateOutlet,
  ],
  providers: [
    {
      provide: MENU_ENTRIES_CONSUMER,
      useExisting: forwardRef(() => TabBarMenuComponent),
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarMenuComponent
  implements OnChanges, AfterViewInit, MenuEntriesConsumer
{
  @Input()
  public menuEntries: Array<MenuEntry>;

  @Input()
  public activeEntry: MenuEntry;

  @Input()
  public activeEntryId: string;

  @Output()
  public activate: EventEmitter<MenuEntry> = new EventEmitter<MenuEntry>();

  public menu: Menu<IMenuEntryProperties> = new Menu<IMenuEntryProperties>();
  public activeEntryIndex: number;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeEntryId']) {
      this.setInitialActiveMenuEntry();
    }

    if (changes['menuEntries']) {
      this.menuEntries.forEach((entry) => this.menu.registerEntry(entry));
    }
  }

  ngAfterViewInit(): void {
    this.setInitialActiveMenuEntry();
  }

  public setMenuEntry(entry: MenuEntry): void {
    const existing: MenuEntry = this.menu
      .getEntries()
      .find((fentry) => fentry.properties.id === entry.properties.id);
    if (existing) {
      Object.assign(existing, entry);
    } else {
      this.menu.registerEntry(entry);
    }
    this.setInitialActiveMenuEntry();
    this.triggerViewUpdate();
  }

  public removeMenuEntry(entry: MenuEntry): void {
    this.menu.removeEntry(entry);
    if (entry?.properties.id === this.activeEntry?.properties.id) {
      this.activeEntry = null;
      this.activeEntryIndex = null;
      this.setInitialActiveMenuEntry();
    }
    this.triggerViewUpdate();
  }

  public triggerViewUpdate(): void {
    this.menuEntries = this.menu
      .getEntries()
      .sort((a, b) => (a.properties.order || 0) - (b.properties.order || 0));
    if (this.activeEntryId) {
      this.activeEntry = this.menuEntries.find(
        (entry) => entry.properties.id === this.activeEntryId
      );
    } else {
      this.activeEntry = this.menuEntries[this.activeEntryIndex || 0];
    }
    this.cdr.markForCheck();
  }

  public onTabChange(ev: NzTabChangeEvent): void {
    const existing = this.menuEntries[ev.index];
    if (existing.canBeExecuted()) {
      existing.exec();
    }
    this.activateMenuEntry(existing);
  }

  private activateMenuEntry(menuEntry: MenuEntry): void {
    this.activate.emit(menuEntry);
    this.activeEntry = menuEntry;
    this.activeEntryIndex = this.menuEntries.indexOf(menuEntry);
  }

  private setInitialActiveMenuEntry(): void {
    if (!this.menuEntries) {
      return;
    }
    let firstActiveEntry: MenuEntry;
    if (this.activeEntryId) {
      firstActiveEntry = this.menuEntries.find(
        (entry) => entry.properties.id === this.activeEntryId
      );
    }

    if (!firstActiveEntry && this.activeEntry) {
      firstActiveEntry = this.menuEntries.find(
        (entry) => entry.properties.id === this.activeEntry?.properties.id
      );
    }

    if (!firstActiveEntry) {
      firstActiveEntry =
        this.menuEntries.find((entry) => entry.properties.active) ||
        this.menuEntries[0];
    }
    this.activateMenuEntry(firstActiveEntry);
  }
}
