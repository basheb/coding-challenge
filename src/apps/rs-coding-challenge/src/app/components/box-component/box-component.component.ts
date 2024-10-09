import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  model,
  ModelSignal,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export type Corners = [number, number, number, number];

@Component({
  selector: 'app-box-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box-component.component.html',
  styleUrl: './box-component.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BoxComponentComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BoxComponentComponent),
      multi: true,
    },
  ],
})
export class BoxComponentComponent<TCorners extends Corners>
  implements ControlValueAccessor, Validator
{
  public disabled: ModelSignal<boolean> = model(false);

  protected value: WritableSignal<TCorners> = signal(undefined);
  protected readableCorners: Signal<{
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  }> = computed(() => {
    if (this.value()) {
      return {
        topLeft: `${this.value()[0]}px`,
        topRight: `${this.value()[1]}px`,
        bottomRight: `${this.value()[2]}px`,
        bottomLeft: `${this.value()[3]}px`
      };
    } else {
      return {
        topLeft: '0px',
        topRight: '0px',
        bottomRight: '0px',
        bottomLeft: '0px'
      };
    }
  });

  private onChange: (value: TCorners) => void;
  private onTouch: () => void;
  private validator: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    return {};
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validator = fn;
  }

  writeValue(obj: TCorners): void {
    this.value.set(obj);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
