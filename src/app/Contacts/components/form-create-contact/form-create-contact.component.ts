import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateContact } from '../../interfaces/create-contact.interface';
import { ContactService } from '../../services/contact.service';
import { ContactResponse } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-form-create-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './form-create-contact.component.html',
})
export class FormCreateContactComponent {
  private contactService = inject(ContactService);
  fb = inject(FormBuilder);

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
