import { Component, effect, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactResponse } from '../../interfaces/contact.interface';
import { FormUtils } from '../../../utils/form-utils';
import { ControlErrorsComponent } from "../../../shared/components/control-errors/control-errors.component";

@Component({
  selector: 'app-form-update-contact',
  imports: [ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './form-update-contact.component.html',
})
export class FormUpdateContactComponent {
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

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

  contact = this.contactService.selectedContact;

  capitalizeName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }



  case = effect(() => {
    const current = this.contact();

    if (current) {
      this.contactForm.patchValue({
        name: this.capitalizeName(current.name),
        phone: current.phone,
        email: current.email.toLowerCase()
      });
    }
  });


  closeModal() {
    this.contactService.closeModal();
    this.contactService.clearSelectedContact()
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, phone, email } = this.contactForm.value;
    const current = this.contact();

    if (!current) return;

    const updateContact: ContactResponse = {
      id: current.id,
      name: name ?? '',
      phone: phone ?? '',
      email: email ?? ''
    };

    this.contactService.updateContact(updateContact.id, updateContact).subscribe({
      next: () => {
        this.contactService.triggerRefresh();
        this.contactForm.reset();
        this.closeModal();
      },
      error: err => console.error(err)
    });
  }
}
