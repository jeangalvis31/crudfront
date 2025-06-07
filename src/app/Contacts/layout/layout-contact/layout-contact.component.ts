import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastMessageComponent } from "../../../shared/components/toast-message/toast-message.component";

@Component({
  selector: 'app-layout-contact',
  imports: [RouterOutlet, ToastMessageComponent],
  templateUrl: './layout-contact.component.html',
})
export class LayoutContactComponent { }
