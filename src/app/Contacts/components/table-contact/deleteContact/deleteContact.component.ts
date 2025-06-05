import { Component, inject, input } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { ContactResponse } from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-delete-contact',
  imports: [],
  templateUrl: './deleteContact.component.html',
})
export class DeleteContactComponent { 

  private contactService = inject(ContactService);

  contact = input.required<ContactResponse>();

  onDelete(): void {
    this.contactService.deleteContacts(this.contact().id).subscribe({
      next: () => {
        this.contactService.triggerRefresh();
      },
      error: err => console.error(err)
    });
  }
}
