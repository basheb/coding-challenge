import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBarMenuComponent } from './tab-bar-menu.component';

describe('TabbarMenuComponent', () => {
  let component: TabBarMenuComponent;
  let fixture: ComponentFixture<TabBarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBarMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabBarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
