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

  it('should toggle linked', () => {
    component.linked = false;
    component.toggleLink();
    expect(component.linked).toBe(true);
  });

  it('should sync values', () => {
    component.radiusForm.setValue({
      topLeft: 10,
    });
    component.syncValues(10);
    expect(component.radiusChange.emit).toHaveBeenCalledWith({
      topLeft: 10,
      topRight: 10,
      bottomLeft: 10,
      bottomRight: 10,
    });
    component.radiusForm.setValue({
      bottomLeft: 11,
    });
    expect(component.radiusChange.emit).toHaveBeenCalledWith({
      topLeft: 11,
      topRight: 11,
      bottomLeft: 11,
      bottomRight: 11,
    });
  });

  it('togggle should sync values when linked', () => {
    component.linked = true;
    component.radiusForm.setValue({
      topLeft: 12,
    });
    component.toggleLink();
    expect(component.syncValues).toHaveBeenCalledWith(12);
  });
});
