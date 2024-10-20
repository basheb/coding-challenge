import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ContentGraphElement } from '../../../content-graph/interface';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { RadiusFormData } from './interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-radius-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzIconDirective],
  templateUrl: './radius-form.component.html',
  styleUrl: './radius-form.component.css',
})
export class RadiusFormComponent implements OnInit, OnChanges {
  public radiusForm: FormGroup;
  linked = false;
  linkedSubscriptions: Subscription[] = [];
  corners = [
    {
      icon: 'radius-upleft',
      controlName: 'topLeft',
    },
    {
      icon: 'radius-upright',
      controlName: 'topRight',
    },
    {
      icon: 'radius-bottomleft',
      controlName: 'bottomLeft',
    },
    {
      icon: 'radius-bottomright',
      controlName: 'bottomRight',
    },
  ];

  @Input() activeElementValues: ContentGraphElement = null;

  @Output() radiusChange = new EventEmitter<RadiusFormData>();

  ngOnInit() {
    this.initializeForm();
    this.subscribeToFormChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Changes the value of the form if the selected element changes
    if (changes['activeElementValues'] && this.radiusForm) {
      this.setFormValues(this.activeElementValues);
    }
  }

  // Sets the form values to the active element's radius values
  setFormValues(activeElement: ContentGraphElement) {
    const values = {
      topLeft: activeElement.style.corners[0],
      topRight: activeElement.style.corners[1],
      bottomRight: activeElement.style.corners[2],
      bottomLeft: activeElement.style.corners[3],
    };
    this.radiusForm.patchValue(values, { emitEvent: false });
  }

  // Initializes the radius form with the initial values
  private initializeForm() {
    this.radiusForm = new FormGroup({
      topLeft: new FormControl(this.activeElementValues.style.corners[0], [
        Validators.required,
        Validators.min(0),
      ]),
      topRight: new FormControl(this.activeElementValues.style.corners[1], [
        Validators.required,
        Validators.min(0),
      ]),
      bottomRight: new FormControl(this.activeElementValues.style.corners[2], [
        Validators.required,
        Validators.min(0),
      ]),
      bottomLeft: new FormControl(this.activeElementValues.style.corners[3], [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  // Subscribes to form changes and emits the changes to the parent component
  private subscribeToFormChanges() {
    this.radiusForm.valueChanges.subscribe((values) => {
      this.radiusChange.emit({
        isValid: this.radiusForm.valid,
        values: values,
      });
    });
  }

  // Helper function that sets every radius to the same value
  syncValues = (val: number) => {
    this.radiusForm.patchValue(
      {
        topLeft: val,
        topRight: val,
        bottomLeft: val,
        bottomRight: val,
      },
      { emitEvent: false }
    );
  };

  // Makes radiuses sync then change together
  toggleLink() {
    this.linked = !this.linked;
    // If radiuses are linked, match all of them to top left for starters
    if (this.linked) {
      const value = this.radiusForm.get('topLeft')?.value;
      this.radiusForm.patchValue({
        topRight: value,
        bottomLeft: value,
        bottomRight: value,
      });
      // Subscribe to all form inputs and call syncValues if any changes
      ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].forEach(
        (controlName) => {
          const control = this.radiusForm.get(controlName);
          if (control) {
            this.linkedSubscriptions.push(
              control.valueChanges.subscribe(this.syncValues)
            );
          }
        }
      );
    }
    // Unsubscribe from all inputs if link is toggled off
    else {
      this.linkedSubscriptions.forEach((sub) => sub.unsubscribe());
    }
  }
}
