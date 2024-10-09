import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxHeaderComponent } from './box-header.component';

describe('ProfileHeaderComponent', () => {
  let component: BoxHeaderComponent;
  let fixture: ComponentFixture<BoxHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
