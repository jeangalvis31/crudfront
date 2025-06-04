import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './create-contact.component.html',
})
export class CreateContactComponent {

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

  

  onSubmit() {
    console.log("submit")
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
  }
}
