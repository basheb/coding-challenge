import {Component, Input} from '@angular/core';

@Component({
    selector: 'rs-overview-page-summary-header-item',
    templateUrl: './overview-page-summary-header-item.component.html',
    styleUrls: ['./overview-page-summary-header-item.component.scss']
})
export class OverviewPageSummaryHeaderItemComponent {
    @Input()
    public title: string;

    @Input()
    public isLoading: boolean;
}
