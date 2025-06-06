import { Component, input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ContactResponse } from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-get-specific-contact',
  imports: [RouterLink],
  templateUrl: './get-specific-contact.component.html',
})
export class GetSpecificContactComponent { 
  contact = input.required<ContactResponse>();
}
