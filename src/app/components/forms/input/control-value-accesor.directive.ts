import { ControlValueAccessor } from '@angular/forms';

export class ControlValueAccesorDirective implements ControlValueAccessor {
  value: string | undefined;
  isDisabled!: boolean;
  onChange!: (value: string) => void;
  onTouch!: () => void;

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
