import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { ContactResponse } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-info',
  imports: [RouterLink],
  templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit{ 
    private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);

  contact: ContactResponse | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getContactById(parseInt(id)).subscribe({
        next: (c) => this.contact = c,
        error: (err) => console.error(err)
      });
    }
  }
}
