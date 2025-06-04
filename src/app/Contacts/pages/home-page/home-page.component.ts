import { Component } from '@angular/core';
import { TableContactComponent } from "../../components/table-contact/table-contact.component";
import { CreateContactComponent } from "../../components/create-contact/create-contact.component";

@Component({
  selector: 'app-home-page',
  imports: [TableContactComponent, CreateContactComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent { }
