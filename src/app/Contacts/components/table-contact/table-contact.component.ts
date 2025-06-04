import { Component, inject, OnInit, signal } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactResponse } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-table-contact',
  imports: [],
  templateUrl: './table-contact.component.html',
})
export class TableContactComponent implements OnInit {


  private contactService = inject(ContactService);

  contacts = signal<ContactResponse[]>([]);

  loadContacts(): void {
    this.contactService.getContacts()
      .subscribe({
        next: (resp) => this.contacts.set(resp),
        error: err => console.error(err)
      });
  }

  ngOnInit(): void {
    this.loadContacts();
  }

  onDelete(id: number): void {
    this.contactService.deleteContacts(id).subscribe({
      next: () => this.loadContacts(),
      error: err => console.error(err)
    });
  }


}
