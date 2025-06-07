import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private _message = signal<string | null>(null);
  message = this._message.asReadonly();

  showMessage(msg: string) {
    this._message.set(msg);
    setTimeout(() => this._message.set(null), 4000);
  }
}
