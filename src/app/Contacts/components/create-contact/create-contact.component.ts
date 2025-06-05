import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './create-contact.component.html',
})
export class CreateContactComponent {

  private contactService = inject(ContactService)

  modalVisible = this.contactService;
  openModal() {
    this.contactService.openModal('create');
  }
}
