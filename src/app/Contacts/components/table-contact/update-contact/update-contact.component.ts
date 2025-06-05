import { Component, inject, input } from '@angular/core';
import { ContactResponse } from '../../../interfaces/contact.interface';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-update-contact',
  imports: [],
  templateUrl: './update-contact.component.html',
})
export class UpdateContactComponent {

  private contactService = inject(ContactService)
  contact = input.required<ContactResponse>();

  openModal() {
    this.contactService.setSelectedContact(this.contact());
    this.contactService.openModal('update');
  }
}
