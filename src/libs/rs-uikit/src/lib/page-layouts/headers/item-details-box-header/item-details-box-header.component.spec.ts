import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsBoxHeaderComponent } from './item-details-box-header.component';

describe('ProfileHeaderComponent', () => {
  let component: ItemDetailsBoxHeaderComponent;
  let fixture: ComponentFixture<ItemDetailsBoxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailsBoxHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailsBoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
