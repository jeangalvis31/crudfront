import { Component, inject } from '@angular/core';
import { TableContactComponent } from "../../components/table-contact/table-contact.component";
import { CreateContactComponent } from "../../components/create-contact/create-contact.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-home-page',
  imports: [TableContactComponent, CreateContactComponent, ModalComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  private contactService = inject(ContactService);
  modalVisible = this.contactService.modalVisible;
  modalType = this.contactService.modalType;
  modalTitle = this.contactService.modalTitle;
}
