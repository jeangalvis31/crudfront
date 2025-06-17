import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-control-errors',
  imports: [],
  templateUrl: './control-errors.component.html',
})
export class ControlErrorsComponent {
  @Input() control!: AbstractControl | null;

  get hasError(): boolean {
    return !!this.control?.errors && this.control.touched;
  }

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors) return null;
    return FormUtils.getFirstErrorText(this.control.errors as ValidationErrors);
  }
}
