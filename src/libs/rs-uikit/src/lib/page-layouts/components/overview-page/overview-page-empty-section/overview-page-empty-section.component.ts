import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'rs-overview-page-empty-section',
    templateUrl: './overview-page-empty-section.component.html',
    styleUrls: ['./overview-page-empty-section.component.scss']
})
export class OverviewPageEmptySectionComponent {
    @Input()
    public createLabel: string;

    @Output()
    public create: EventEmitter<void> = new EventEmitter<void>();
}
