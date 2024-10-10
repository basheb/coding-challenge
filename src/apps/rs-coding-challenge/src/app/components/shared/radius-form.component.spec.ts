import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadiusFormComponent } from './radius-form.component';

describe('RadiusFormComponent', () => {
  let component: RadiusFormComponent;
  let fixture: ComponentFixture<RadiusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadiusFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadiusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
