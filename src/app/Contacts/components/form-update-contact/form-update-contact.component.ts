import { Component, effect, inject, input } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactResponse } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-form-update-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './form-update-contact.component.html',
})
export class FormUpdateContactComponent {
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s]+$")]],
    phone: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{7,15}$')
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
  });

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
