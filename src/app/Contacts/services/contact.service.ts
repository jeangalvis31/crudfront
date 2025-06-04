import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ContactResponse } from '../interfaces/contact.interface';
import { environment } from '../environments/environment';
import { CreateContact } from '../interfaces/create-contact.interface';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);

  getContacts(): Observable<ContactResponse[]> {
    return this.http.get<ContactResponse[]>(`${baseUrl}/contact`).pipe(
      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(() => new Error(`No se pudo obtener los contactos`));
      })
    )
  }

  deleteContacts(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${baseUrl}/contact/${id}`).pipe(
      catchError((error) => {
        console.log('Error fetching', error);

        return throwError(() => new Error(`No se pudo eliminar el contacto`));
      })
    )
  }

  createContact(createContact: CreateContact): Observable<CreateContact>{
    return this.http.post<CreateContact>(`${baseUrl}/contact`, createContact).pipe(
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo eliminar el contacto`));
      })
    )
  }
}
