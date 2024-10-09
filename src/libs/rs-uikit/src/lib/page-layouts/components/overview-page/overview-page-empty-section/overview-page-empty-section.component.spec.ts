import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewPageEmptySectionComponent } from './overview-page-empty-section.component';

describe('PosrtStatusTagComponent', () => {
  let component: OverviewPageEmptySectionComponent;
  let fixture: ComponentFixture<OverviewPageEmptySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewPageEmptySectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageEmptySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
