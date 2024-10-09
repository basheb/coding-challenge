import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupMenuComponent } from './radio-group-menu.component';

describe('TabbarMenuComponent', () => {
  let component: RadioGroupMenuComponent;
  let fixture: ComponentFixture<RadioGroupMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioGroupMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioGroupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
