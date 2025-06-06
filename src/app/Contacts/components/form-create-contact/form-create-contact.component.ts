import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateContact } from '../../interfaces/create-contact.interface';
import { ContactService } from '../../services/contact.service';
import { FormUtils } from '../../../utils/form-utils';
import { ControlErrorsComponent } from "../../../shared/components/control-errors/control-errors.component";

@Component({
  selector: 'app-form-create-contact',
  imports: [ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './form-create-contact.component.html',
})
export class FormCreateContactComponent {
  private contactService = inject(ContactService);
  fb = inject(FormBuilder);
  formUtils = FormUtils;

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    phone: ['', [
      Validators.required,
      Validators.pattern(this.formUtils.phonePatter)
    ]],
    email: ['', [
      Validators.required,
      Validators.pattern(this.formUtils.emailPattern)
    ]],
  })

  closeModal() {
    this.contactService.closeModal();
  }


  onCreate() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, phone, email } = this.contactForm.value;

    const newContact: CreateContact = {
      name: name ?? '',
      phone: phone ?? '',
      email: email ?? ''
    };



    this.contactService.createContact(newContact).subscribe({
      next: (resp) => {
        this.contactService.triggerRefresh();
        this.contactForm.reset();
        this.closeModal();
      },
      error: err => console.error(err)
    });


  }

}
