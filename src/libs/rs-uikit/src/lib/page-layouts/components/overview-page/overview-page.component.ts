import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import { Action } from '../../../actions/interface';

@Component({
    selector: 'rs-overview-page',
    templateUrl: './overview-page.component.html',
    styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent {
    @Input()
    public title: string;

    @Input()
    public itemType: string;

    @Output()
    public back: EventEmitter<void> = new EventEmitter<void>();

    public actions: Array<Action> = [];
    public titleAddOn: TemplateRef<any>;
    public summaryHeader: TemplateRef<any>;
    public sidebarSectionTemplates: Array<TemplateRef<any>> = [];
}
