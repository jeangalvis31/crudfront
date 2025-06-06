// contact-form.component.ts
import { Component, effect, inject, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../services/contact.service';
import { FormUtils } from '../../../utils/form-utils';
import { ContactResponse } from '../../interfaces/contact.interface';
import { CreateContact } from '../../interfaces/create-contact.interface';
import { ControlErrorsComponent } from '../../../shared/components/control-errors/control-errors.component';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlErrorsComponent],
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  formUtils = FormUtils;

  contact = this.contactService.selectedContact;
  mode = input.required<'create' | 'update'>();

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    phone: ['', [Validators.required, Validators.pattern(this.formUtils.phonePatter)]],
    email: ['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
  });

  case = effect(() => {
    if (this.mode() === 'update') {
      const c = this.contact();
      if (c) {
        this.contactForm.patchValue({
          name: this.capitalize(c.name),
          phone: c.phone,
          email: c.email.toLowerCase()
        });
      }
    }
  });

  capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  closeModal() {
    this.contactService.closeModal();
    this.contactService.clearSelectedContact();
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, phone, email } = this.contactForm.value;

    if (this.mode() === 'create') {
      const newContact: CreateContact = {
        name: name ?? '',
        phone: phone ?? '',
        email: email ?? ''
      };
      this.contactService.createContact(newContact).subscribe({
        next: () => {
          this.contactService.triggerRefresh();
          this.contactForm.reset();
          this.closeModal();
        }
      });
    }

    if (this.mode() === 'update') {
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
        }
      });
    }
  }
}
