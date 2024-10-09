import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPageSummaryHeaderItemComponent } from './overview-page-summary-header-item.component';

describe('PosrtStatusTagComponent', () => {
  let component: OverviewPageSummaryHeaderItemComponent;
  let fixture: ComponentFixture<OverviewPageSummaryHeaderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewPageSummaryHeaderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageSummaryHeaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
