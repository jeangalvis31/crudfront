import { Component, input, signal } from '@angular/core';
import { ContactFormComponent } from "../contact-form/contact-form.component";

@Component({
  selector: 'app-modal',
  imports: [ContactFormComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  formType = input.required<'create' | 'update'>();
  title = input.required<string>();
}
