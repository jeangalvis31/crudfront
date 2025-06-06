import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ContactResponse } from '../interfaces/contact.interface';
import { environment } from '../environments/environment';
import { CreateContact } from '../interfaces/create-contact.interface';
import { ContactMapper } from '../mappers/contact.mapper';

const baseUrl = environment.baseUrl;


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);



  //=====señales para controlar el modal generico=====
  private _modalVisible = signal<boolean>(false);
  modalVisible = this._modalVisible.asReadonly();
  private _modalType = signal<'create' | 'update' | null>(null);
  modalType = this._modalType.asReadonly();


  modalTitle = computed(() => {
    const type = this._modalType();
    if (type === 'create') return 'Crear nuevo contacto';
    if (type === 'update') return 'Actualizar contacto';
    return '';
  });

  openModal(type: 'create' | 'update') {
    this._modalVisible.set(true);
    this._modalType.set(type);
  }

  closeModal() {
    this._modalVisible.set(false);
    this._modalType.set(null);
  }
  //==================================================

  //=====señales para controlar la info del formulario update=====
  private _selectedContact = signal<ContactResponse | null>(null);
  selectedContact = this._selectedContact.asReadonly();

  setSelectedContact(contact: ContactResponse) {
    this._selectedContact.set(contact);
  }

  clearSelectedContact() {
    this._selectedContact.set(null);
  }
  //==================================================

  //=====Señales para actualizar la tabla=======
  private _refresh = signal<boolean>(false);

  get refreshSignal() {
    return this._refresh.asReadonly();
  }

  triggerRefresh() {
    this._refresh.update(v => !v);
  }
  //===========================================


  //==========Peticiones http al back============

  getContactById(id: number): Observable<ContactResponse> {
    return this.http.get<ContactResponse>(`${baseUrl}/contact/${id}`).pipe(
      map((contact) => ContactMapper.mapRestContactGetToContactGet(contact)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo obtener el contacto`));
      })
    )
  }

  getContacts(): Observable<ContactResponse[]> {
    return this.http.get<ContactResponse[]>(`${baseUrl}/contact`).pipe(
      map((contactResponse) => ContactMapper.mapRestContactGetArrayToContactGetArray(contactResponse)),
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
  createContact(createContact: CreateContact): Observable<CreateContact> {
    return this.http.post<CreateContact>(`${baseUrl}/contact`, createContact).pipe(
      map((createdContact) => ContactMapper.mapCreateContactGetToContactGet(createdContact)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo crear el contacto`));
      })
    )
  }
  updateContact(id: number, contactResponse: ContactResponse): Observable<ContactResponse> {
    return this.http.put<ContactResponse>(`${baseUrl}/contact/${id}`, contactResponse).pipe(
      map((contact) => ContactMapper.mapRestContactGetToContactGet(contact)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(() => new Error(`No se pudo modificar el contacto`));
      })
    )
  }
  //===========================================
}
