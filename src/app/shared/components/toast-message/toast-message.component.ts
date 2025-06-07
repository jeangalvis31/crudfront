import { Component, inject } from '@angular/core';
import { NotificationsService } from '../../../Contacts/services/notifications.service';

@Component({
  selector: 'app-toast-message',
  imports: [],
  templateUrl: './toast-message.component.html',
})
export class ToastMessageComponent { 
  notificationService = inject(NotificationsService)

   message = this.notificationService.message;
}
