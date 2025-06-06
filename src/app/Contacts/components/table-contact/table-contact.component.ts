import { Component, effect, inject, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactResponse } from '../../interfaces/contact.interface';
import { UpdateContactComponent } from "./update-contact/update-contact.component";
import { DeleteContactComponent } from "./deleteContact/deleteContact.component";
import { LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-table-contact',
  imports: [UpdateContactComponent, DeleteContactComponent, TitleCasePipe, LowerCasePipe],
  templateUrl: './table-contact.component.html',
})
export class TableContactComponent {


  private contactService = inject(ContactService);

  contacts = signal<ContactResponse[]>([]);

  loadContacts(): void {
    this.contactService.getContacts()
      .subscribe({
        next: (resp) => this.contacts.set(resp),
        error: err => console.error(err)
      });
  }

  private refreshEffect = effect(() => {
    this.contactService.refreshSignal();
    this.loadContacts();
  });
}
