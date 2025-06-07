import { Component, effect, inject, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactResponse } from '../../interfaces/contact.interface';
import { UpdateContactComponent } from "./update-contact/update-contact.component";
import { DeleteContactComponent } from "./deleteContact/deleteContact.component";
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { GetSpecificContactComponent } from "./get-specific-contact/get-specific-contact.component";

@Component({
  selector: 'app-table-contact',
  imports: [UpdateContactComponent, DeleteContactComponent, TitleCasePipe, GetSpecificContactComponent],
  templateUrl: './table-contact.component.html',
})
export class TableContactComponent {


  private contactService = inject(ContactService);

  contacts = signal<ContactResponse[]>([]);

  columns: string[] = [];


  loadContacts(): void {
    this.contactService.getContacts()
      .subscribe({
        next: (resp) => {
          this.contacts.set(resp)
          if (resp.length > 0) {
            this.columns = Object.keys(resp[0]);
          }
        }
      });
  }

  private refreshEffect = effect(() => {
    this.contactService.refreshSignal();
    this.loadContacts();
  });
}
