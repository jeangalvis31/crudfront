import { Component, input, signal } from '@angular/core';
import { FormCreateContactComponent } from "../form-create-contact/form-create-contact.component";
import { FormUpdateContactComponent } from "../form-update-contact/form-update-contact.component";

@Component({
  selector: 'app-modal',
  imports: [FormCreateContactComponent, FormUpdateContactComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  formType = input<'create' | 'update'  | null>();
  title = input.required<string>();
}
